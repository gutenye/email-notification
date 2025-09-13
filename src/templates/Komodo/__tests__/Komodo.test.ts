import { keyBy } from 'lodash-es'
import { describe, expect, it } from 'vitest'
import { invokeWorker } from '#/test'
import type { Message } from '#/types'

const normalFixtures = (): Fixture[] => [
	// { name, body, path, env, expected }
	{
		name: 'type StackAutoUpdated',
		body: createBody('StackAutoUpdated'),
		expected: createExpected('[Komodo/Server1] Stack1 image upgraded'),
	},
	{
		name: 'type StackStateChange',
		body: createBody('StackStateChange'),
		expected: createExpected('[Komodo/Server1] Stack1 unhealthy -> stopped'),
	},

	{
		name: 'type ServerCpu',
		body: createBody('ServerCpu'),
		expected: createExpected('[Komodo/Server1] CPU at 50%'),
	},
	{
		name: 'type ServerDisk',
		body: createBody('ServerDisk'),
		expected: createExpected('[Komodo/Server1] Disk used at 50%'),
	},
	{
		name: 'type ServerUnreachable',
		body: createBody('ServerUnreachable'),
		expected: createExpected(
			'[Komodo/Server1] Server unreachable for 401 Unauthorized',
		),
	},
	{
		name: 'type ServerVersionMismatch',
		body: createBody('ServerVersionMismatch'),
		expected: createExpected(
			'[Komodo/Server1] Server version mismatch: 1.19.2 vs 1.19.3',
		),
	},
	{
		name: 'type ScheduleRun',
		body: createBody('ScheduleRun'),
		expected: createExpected(
			'[Komodo/Server1] Run schedule Global Auto Update',
		),
	},
]

const skipFixtures = (): Fixture[] => [
	{
		name: 'skip via env: a in a,b',
		body: createBody('StackStateChange'),
		env: { KOMODO_SKIP: 'StackStateChange,ServerCpu' },
		expected: {
			skip: 'Skipped StackStateChange',
		},
	},
	{
		name: 'skip via env: b in a,b',
		body: createBody('ServerCpu'),
		env: { KOMODO_SKIP: 'StackStateChange,ServerCpu' },
		expected: {
			skip: 'Skipped ServerCpu',
		},
	},
	{
		name: 'skip via param',
		body: createBody('StackStateChange'),
		path: 'skip=StackAutoUpdated,StackStateChange',
		expected: {
			skip: 'Skipped StackStateChange',
		},
	},
	{
		name: 'skip not match',
		body: createBody('StackAutoUpdated'),
		env: { KOMODO_SKIP: 'StackStateChange,ServerCpu' },
		expected: {
			skip: undefined,
			title: 'defined',
		},
	},
	{
		name: 'skip param overrides env: a in param',
		body: createBody('StackAutoUpdated'),
		path: 'skip=StackAutoUpdated,StackStateChange',
		env: { KOMODO_SKIP: 'ServerCpu' },
		expected: {
			skip: 'defined',
			title: 'undefined',
		},
	},
	{
		name: 'skip param overrides env: a in env',
		body: createBody('ServerCpu'),
		path: 'skip=StackAutoUpdated,StackStateChange',
		env: { KOMODO_SKIP: 'ServerCpu' },
		expected: createExpected('[Komodo/Server1] CPU at 50%'),
	},
	{
		name: 'skip param overries env: param is empty',
		body: createBody('ServerCpu'),
		path: 'skip=',
		env: { KOMODO_SKIP: 'StackAutoUpdated,ServerCpu' },
		expected: createExpected('[Komodo/Server1] CPU at 50%'),
	},
]

function main() {
	// const fixtures = [...normalFixtures(), ...skipFixtures()]
	const fixtures = []

	fixtures.forEach(({ name, body, path = '', env = {}, expected }) => {
		it(name, async () => {
			const response = await invokeWorker(
				`/testKey?template=Komodo&serverName=Server1&komodoHost=https://komodo.com&${path}`,
				{
					method: 'POST',
					body: JSON.stringify(body),
				},
				env,
			)
			if (typeof expected.message === 'function') {
				expected.message = expected.message({ body })
			}
			expect(await response.json()).toEqual(expected)
		})
	})
}

function createBody(name: string): any {
	const data = [
		createStack('StackAutoUpdated', {
			images: ['gutenye/hello-node:latest'],
		}),
		createStack('StackStateChange', {
			from: 'unhealthy',
			to: 'stopped',
		}),
		createStack('StackStateChange', {
			from: 'unhealthy',
			to: 'stopped',
		}),
		createServer('ServerCpu', {
			percentage: 50.12345,
		}),
		createServer('ServerDisk', {
			path: '/',
			used_gb: 100.123,
			total_gb: 200.246,
		}),
		createServer('ServerUnreachable', {
			err: {
				error: '401 Unauthorized',
				trace: ['request passkey invalid'],
			},
		}),
		createServer('ServerVersionMismatch', {
			server_version: '1.19.3',
			core_version: '1.19.2',
		}),
		create('ScheduleRun', {
			name: 'Global Auto Update',
			resource_type: 'Procedure',
		}),
	]
	const dataMap = keyBy(data, 'type') as Record<string, any>
	return {
		ts: 1756802981654,
		resolved: true,
		level: 'OK',
		target: {
			type: 'Stack',
			id: 'targetId1',
		},
		data: dataMap[name],
		resolved_ts: 1756802981654,
	}
}

function createStack(type: string, data: any) {
	return {
		type,
		data: {
			id: 'id1',
			name: 'Stack1',
			server_id: 'serverId1',
			server_name: 'Server1',
			...data,
		},
	}
}

function createServer(type: string, data: any) {
	return {
		type,
		data: {
			id: 'id1',
			name: 'Server1',
			region: null,
			...data,
		},
	}
}

function create(type: string, data: any) {
	return {
		type,
		data: {
			id: 'id1',
			...data,
		},
	}
}

interface Fixture {
	name: string
	body: string
	path?: string
	env?: Record<string, string>
	expected: Message
}

const createMessage: CreateMessage = ({ body }) => {
	return `
https://komodo.com/stacks/targetId1
${JSON.stringify(body, null, 2)}
	`.trim()
}

type CreateMessage = (options: { body: Record<string, any> }) => string

function createExpected(title: string): Message {
	return {
		title,
		message: createMessage,
	}
}

main()
