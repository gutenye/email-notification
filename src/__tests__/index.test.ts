import { describe, expect, it } from 'vitest'
import { createInvoke } from '#/test'
import type { CreateExpected, Fixture } from '#/test/types'

describe('template', () => {
	it('template name lower case', async () => {
		const invoke = createInvoke('template=generic')
		const { result, expected } = await invoke({
			body: {
				title: 'MyTitle',
				message: 'MyMessage',
			},
			expected: {
				title: 'MyTitle',
				message: 'MyMessage',
			},
		})
		expect(result).toEqual(expected)
	})
})
