import { describe, expect, it } from 'vitest'
import { buildSimpleMessage } from '../buildSimpleMessage'

describe('buildSimpleMessage', () => {
	it('should parse message', async () => {
		const message = await buildSimpleMessage(
			new Request('https://example.com', {
				method: 'POST',
				body: 'title\nbody',
			}),
		)
		const expected = {
			title: 'title',
			message: 'body',
		}
		expect(message).toEqual(expected)
	})

	it('should parse message with no body', async () => {
		const message = await buildSimpleMessage(
			new Request('https://example.com', { method: 'POST', body: 'title' }),
		)
		const expected = {
			title: 'title',
			message: '',
		}
		expect(message).toEqual(expected)
	})

	it('should parse message with \\n inbody', async () => {
		const message = await buildSimpleMessage(
			new Request('https://example.com', {
				method: 'POST',
				body: 'title\\nline1\\nline2',
			}),
		)
		const expected = {
			title: 'title',
			message: 'line1\nline2',
		}
		expect(message).toEqual(expected)
	})
})
