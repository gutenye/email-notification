import { keyBy } from 'lodash-es'
import { describe, expect, it } from 'vitest'
import { Komodo } from '../Komodo'

const serverName = 'Server1'
const komodoHost = 'https://komodo.com'

describe('komodo', () => {
	;[
		['StackAutoUpdated', '[Komodo/Server1] Stack1 image upgraded'],
		['StackStateChange', '[Komodo/Server1] Stack1 unhealthy -> stopped'],
		['ServerCpu', '[Komodo/Server1] CPU at 50%'],
		['ServerDisk', '[Komodo/Server1] Disk used at 50%'],
		[
			'ServerUnreachable',
			'[Komodo/Server1] Server unreachable for 401 Unauthorized',
		],
		[
			'ServerVersionMismatch',
			'[Komodo/Server1] Server version mismatch: 1.19.2 vs 1.19.3',
		],
		['ScheduleRun', '[Komodo/Server1] Run schedule Global Auto Update'],
	].forEach(([name, title]) => {
		it(name, () => {
			const fixture = createFixture(name)
			const message = Komodo(fixture, { serverName, komodoHost }, {})
			const result = {
				title,
				message: `
https://komodo.com/stacks/targetId1
${JSON.stringify(fixture, null, 2)}
      `.trim(),
			}
			expect(message).toEqual(result)
		})
	})

	it('skip', () => {
		const fixture = createFixture('StackStateChange')
		const message = Komodo(
			fixture,
			{ serverName, komodoHost },
			{ KOMODO_SKIP: 'StackStateChange,ServerCpu' },
		)
		expect(message.skip).toEqual('Skipped StackStateChange')

		const fixture2 = createFixture('ServerCpu')
		const message2 = Komodo(
			fixture2,
			{ serverName, komodoHost },
			{ KOMODO_SKIP: 'StackStateChange,ServerCpu' },
		)
		expect(message2.skip).toEqual('Skipped ServerCpu')

		const fixture3 = createFixture('StackAutoUpdated')
		const message3 = Komodo(
			fixture3,
			{ serverName, komodoHost },
			{ KOMODO_SKIP: 'StackStateChange,ServerCpu' },
		)
		expect(message3.skip).toBeUndefined()
		expect(message3.title).toBeDefined()

		// higher priority
		const fixture4 = createFixture('StackAutoUpdated')
		const message4 = Komodo(
			fixture4,
			{ serverName, komodoHost, skip: 'StackAutoUpdated,StackStateChange' },
			{ KOMODO_SKIP: '' },
		)
		expect(message4.skip).toBeDefined()
		expect(message4.title).toBeUndefined()

		const fixture5 = createFixture('StackAutoUpdated')
		const message5 = Komodo(
			fixture5,
			{ serverName, komodoHost, skip: '' },
			{ KOMODO_SKIP: 'StackAutoUpdated,ServerCpu' },
		)
		expect(message5.skip).toBeUndefined()
		expect(message5.title).toBeDefined()
	})
})

function createFixture(name: string) {
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
			usedGb: 100.123,
			totalGb: 200.246,
		}),
		createServer('ServerUnreachable', {
			err: {
				error: '401 Unauthorized',
				trace: ['request passkey invalid'],
			},
		}),
		createServer('ServerVersionMismatch', {
			serverVersion: '1.19.3',
			coreVersion: '1.19.2',
		}),
		create('ScheduleRun', {
			name: 'Global Auto Update',
			resourceType: 'Procedure',
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
		resolvedTs: 1756802981654,
	}
}

function createStack(type: string, data: any) {
	return {
		type,
		data: {
			id: 'id1',
			name: 'Stack1',
			serverId: 'serverId1',
			serverName: 'Server1',
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
