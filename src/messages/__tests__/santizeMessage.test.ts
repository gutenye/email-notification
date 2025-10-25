import { describe, expect, it } from 'vitest'
import { createInvoke } from '~/test'

describe('sanitizeMessage', () => {
	it('strips api keys', async () => {
		const invoke = createInvoke()
		const { result, expected } = await invoke({
			body: '1 testKey 2 testKey 3\n4 testKey 5 testKey 6',
			expected: {
				title: '1 API_KEY 2 API_KEY 3',
				message: '4 API_KEY 5 API_KEY 6',
			},
		})
		expect(result).toEqual(expected)
	})

	it('provides default title and message', async () => {
		const invoke = createInvoke()
		const { result, expected } = await invoke({
			body: '',
			expected: { title: 'Notification', message: undefined },
		})
		expect(result).toEqual(expected)
	})
})
