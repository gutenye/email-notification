import { describe, expect, it } from 'vitest'
import { Komodo } from '../Komodo'

const serverName = 'Server1'
const komodoHost = 'https://komodo.com'

describe('komodo', () => {
	;[
		['StackAutoUpdated', '[Komodo/Server1] Stack1 image upgraded'],
		['StackStateChange', '[Komodo/Server1] Stack1 unhealthy -> stopped'],
		['ServerCpu', '[Komodo/Server1] CPU at 50%'],
		['ServerDisk', '[Komodo/Server1] disk used at 50%'],
		['ScheduleRun', '[Komodo/Server1] run schedule Global Auto Update'],
	].forEach(([name, title]) => {
		it(name, () => {
			const fixture = createFixture(name)
			const message = Komodo(fixture, { serverName, komodoHost })
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
})

function createFixture(name: string) {
	const data = {
		StackAutoUpdated: {
			type: 'StackAutoUpdated',
			data: {
				id: 'id1',
				name: 'Stack1',
				serverId: 'serverId1',
				serverName: 'Server1',
				images: ['gutenye/hello-node:latest'],
			},
		},
		StackStateChange: {
			type: 'StackStateChange',
			data: {
				id: 'id1',
				name: 'Stack1',
				serverId: 'serverId1',
				serverName: 'Server1',
				from: 'unhealthy',
				to: 'stopped',
			},
		},
		ServerCpu: {
			type: 'ServerCpu',
			data: {
				id: 'id1',
				name: 'Server1',
				region: null,
				percentage: 50.12345,
			},
		},
		ServerDisk: {
			type: 'ServerDisk',
			data: {
				id: 'id1',
				name: 'Server1',
				region: null,
				path: '/',
				usedGb: 100.123,
				totalGb: 200.246,
			},
		},
		ScheduleRun: {
			type: 'ScheduleRun',
			data: {
				id: 'id1',
				name: 'Global Auto Update',
				resourceType: 'Procedure',
			},
		},
	}

	return {
		ts: 1756802981654,
		resolved: true,
		level: 'OK',
		target: {
			type: 'Stack',
			id: 'targetId1',
		},
		data: data[name as keyof typeof data],
		resolvedTs: 1756802981654,
	}
}
