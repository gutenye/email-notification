import { describe, expect, it } from 'vitest'
import type { Payload } from '../Generic'
import { Generic } from '../Generic'

describe('Generic', () => {
	;(
		[
			[{ title: 'MyTitle', message: 'MyMessage' }, {}, 'MyTitle', 'MyMessage'],
			[
				{ a: 'MyTitle', b: 'MyMessage' },
				{ titleKey: 'a', messageKey: 'b' },
				'MyTitle',
				'MyMessage',
			],
		] as Fixture[]
	).forEach(([payload, params, title, message]) => {
		it(payload, () => {
			const result = Generic(payload, params)
			const expected = {
				title,
				message,
			}
			expect(result).toEqual(expected)
		})
	})
})

function createFixture(name: string): Payload {
	const fixtureTypes = {
		'Type1.SubType1': {
			...common,
			type: 'Type1',
			subType: 'SubType1',
		},
	}

	return fixtureTypes[name as keyof typeof fixtureTypes] as Payload
}

type Fixture = [Payload, Params, string, string]
