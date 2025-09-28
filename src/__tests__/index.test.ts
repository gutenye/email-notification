import { describe, expect, it } from 'vitest'
import { createInvoke } from '#/test'

describe('template', () => {
	it('template name lower case', async () => {
		const invoke = createInvoke('_template=generic')
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
