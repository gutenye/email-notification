import { describe, expect, it } from 'vitest'
import { createInvoke } from '#/test'
import type { CreateExpected } from '#/test/types'

const invoke = createInvoke(
	'_template=Komodo&_serverName=Server1&_komodoHost=https://komodo.com',
)

describe('type', () => {
	it('type StackAutoUpdated', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackAutoUpdated'),
			expected: createExpected('[Komodo/Server1] Stack1 image1 image upgraded'),
		})
		expect(result).toEqual(expected)
	})

	it('type StackAutoUpdated.MultipleImages', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackAutoUpdated.MultipleImages'),
			expected: createExpected(
				'[Komodo/Server1] Stack1 image1, image2, image3, image4 images upgraded',
			),
		})
		expect(result).toEqual(expected)
	})

	it('type StackStateChange', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackStateChange'),
			expected: createExpected('[Komodo/Server1] Stack1 unhealthy -> stopped'),
		})
		expect(result).toEqual(expected)
	})

	it('type StackImageUpdateAvailable', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackImageUpdateAvailable'),
			expected: createExpected(
				'[Komodo/Server1] Stack1 image1 update available',
			),
		})
		expect(result).toEqual(expected)
	})

	it('type ServerCpu', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerCpu'),
			expected: createExpected('[Komodo/Server1] CPU at 50%'),
		})
		expect(result).toEqual(expected)
	})

	it('type ServerDisk', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerDisk'),
			expected: createExpected('[Komodo/Server1] Disk used at 50%'),
		})
		expect(result).toEqual(expected)
	})

	it('type ServerUnreachable', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerUnreachable'),
			expected: createExpected(
				'[Komodo/Server1] Server unreachable for 401 Unauthorized',
			),
		})
		expect(result).toEqual(expected)
	})

	it('type ServerVersionMismatch', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerVersionMismatch'),
			expected: createExpected(
				'[Komodo/Server1] Server version mismatch: 1.19.2 vs 1.19.3',
			),
		})
		expect(result).toEqual(expected)
	})

	it('type ScheduleRun', async () => {
		const { result, expected } = await invoke({
			body: createBody('ScheduleRun'),
			expected: createExpected(
				'[Komodo/Server1] Run schedule Global Auto Update',
			),
		})
		expect(result).toEqual(expected)
	})

	it('type ResourceSyncPendingUpdates', async () => {
		const { result, expected } = await invoke({
			body: createBody('ResourceSyncPendingUpdates'),
			expected: createExpected(
				"[Komodo/Server1] Sync 'MySync' is pending for updates",
			),
		})
		expect(result).toEqual(expected)
	})
})

describe('skip', () => {
	it('skip via env: a in a,b', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackStateChange'),
			env: { KOMODO_SKIP: 'StackStateChange,ServerCpu' },
			expected: {
				skip: 'Skipped StackStateChange',
			},
		})
		expect(result).toEqual(expected)
	})

	it('skip via env: b in a,b', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerCpu'),
			env: { KOMODO_SKIP: 'StackStateChange,ServerCpu' },
			expected: {
				skip: 'Skipped ServerCpu',
			},
		})
		expect(result).toEqual(expected)
	})

	it('skip via param', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackStateChange'),
			path: 'skip=StackAutoUpdated,StackStateChange',
			expected: {
				skip: 'Skipped StackStateChange',
			},
		})
		expect(result).toEqual(expected)
	})

	it('skip not match', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerDisk'),
			env: { KOMODO_SKIP: 'StackStateChange,ServerCpu' },
			expected: createExpected('[Komodo/Server1] Disk used at 50%'),
		})
		expect(result).toEqual(expected)
	})

	it('skip param overrides env: a in param', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackAutoUpdated'),
			path: 'skip=StackAutoUpdated,StackStateChange',
			env: { KOMODO_SKIP: 'ServerCpu' },
			expected: {
				skip: 'Skipped StackAutoUpdated',
			},
		})
		expect(result).toEqual(expected)
	})

	it('skip param overrides env: a in env', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerCpu'),
			path: 'skip=StackAutoUpdated,StackStateChange',
			env: { KOMODO_SKIP: 'ServerCpu' },
			expected: createExpected('[Komodo/Server1] CPU at 50%'),
		})
		expect(result).toEqual(expected)
	})

	it('skip param overries env: param is empty', async () => {
		const { result, expected } = await invoke({
			body: createBody('ServerCpu'),
			path: 'skip=',
			env: { KOMODO_SKIP: 'StackAutoUpdated,ServerCpu' },
			expected: createExpected('[Komodo/Server1] CPU at 50%'),
		})
		expect(result).toEqual(expected)
	})
})

function createBody(name: string): any {
	const data = Object.fromEntries([
		createStack('StackAutoUpdated', {
			images: ['image1'],
		}),
		createStack('StackAutoUpdated.MultipleImages', {
			images: [
				'image1',
				'image2:latest',
				'user/image3:latest',
				'ghcr.io/user/image4:latest',
			],
		}),
		createStack('StackStateChange', {
			from: 'unhealthy',
			to: 'stopped',
		}),
		createStack('StackStateChange', {
			from: 'unhealthy',
			to: 'stopped',
		}),
		createStack('StackImageUpdateAvailable', {
			service: 'service1',
			image: 'ghcr.io/user/image1:latest',
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
		create('ResourceSyncPendingUpdates', {
			name: 'MySync',
		}),
	])
	return {
		ts: 1756802981654,
		resolved: true,
		level: 'OK',
		target: {
			type: 'Stack',
			id: 'targetId1',
		},
		data: data[name],
		resolved_ts: 1756802981654,
	}
}

function createStack(name: string, data: any) {
	return createItem(name, (type) => ({
		type,
		data: {
			id: 'id1',
			name: 'Stack1',
			server_id: 'serverId1',
			server_name: 'Server1',
			...data,
		},
	}))
}

function createServer(name: string, data: any) {
	return createItem(name, (type) => ({
		type,
		data: {
			id: 'id1',
			name: 'Server1',
			region: null,
			...data,
		},
	}))
}

function create(name: string, data: any) {
	return createItem(name, (type) => ({
		type,
		data: {
			id: 'id1',
			...data,
		},
	}))
}

function createExpected(title: string): CreateExpected {
	return ({ body }) => ({
		title,
		message: `
https://komodo.com/stacks/targetId1
${JSON.stringify(body, null, 2)}
		`.trim(),
	})
}

function createItem(
	name: string,
	fn: (type: string) => any,
): [string, Record<string, any>] {
	const type = name.split('.')[0]
	return [name, fn(type)]
}
