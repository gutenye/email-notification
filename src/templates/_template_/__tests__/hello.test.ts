import { describe, expect, it } from 'vitest'
import type { Payload } from '../hello'
import { hello } from '../hello'

describe('hello', () => {
	;[
		['Type1.SubType1', '[Hello/MyServer] Action1'],
		['Type2', '[Hello/MyServer] Action2'],
	].forEach(([name, title]) => {
		it(name, () => {
			const fixture = createFixture(name)
			const result = hello(fixture)
			const expected = {
				title,
				message: `
https://hello.com/itemId
${JSON.stringify(fixture, null, 2)}
      `.trim(),
			}
			expect(result).toEqual(expected)
		})
	})
})

function createFixture(name: string): Payload {
	const common = {
		serverName: 'MyServer',
		serverUrl: 'https://hello.com',
		itemId: 'itemId1',
		type: 'Type1',
	}

	const fixtureTypes = {
		'Type1.SubType1': {
			...common,
			type: 'Type1',
			subType: 'SubType1',
		},
	}

	return fixtureTypes[name as keyof typeof fixtureTypes] as Payload
}
