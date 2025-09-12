import { describe, expect, it } from 'vitest'
import { buildTextMessage } from '../buildTextMessage'

describe('buildSimpleMessage', () => {
	it('should parse message', async () => {
		const message = await buildTextMessage(
			new Request('https://example.com', {
				method: 'POST',
				body: 'MyTitle\nLine1\nLine2',
			}),
		)
		const expected = {
			title: 'MyTitle',
			message: 'Line1\nLine2',
		}
		expect(message).toEqual(expected)
	})

	it('should parse message with title only', async () => {
		const message = await buildTextMessage(
			new Request('https://example.com', { method: 'POST', body: 'MyTitle' }),
		)
		const expected = {
			title: 'MyTitle',
			message: '',
		}
		expect(message).toEqual(expected)
	})

	it('should parse message with \\n inbody', async () => {
		const message = await buildTextMessage(
			new Request('https://example.com', {
				method: 'POST',
				body: 'MyTitle\\nLine1\\nLine2',
			}),
		)
		const expected = {
			title: 'MyTitle',
			message: 'Line1\nLine2',
		}
		expect(message).toEqual(expected)
	})

	it('support title parameter', async () => {
		const message = await buildTextMessage(
			new Request('https://example.com', {
				method: 'POST',
				body: 'Line1\nLine2',
			}),
			{ title: 'MyTitle' },
		)
		const expected = {
			title: 'MyTitle',
			message: 'Line1\nLine2',
		}
		expect(message).toEqual(expected)
	})
})
