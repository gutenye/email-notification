import { describe, expect, it } from 'vitest'
import { buildDebugMessage } from '../buildDebugMessage'

describe('buildDebugMessage', () => {
	it('should build debug message', async () => {
		const request = new Request('https://example.com/MyApiKey?_debug=MyTitle', {
			method: 'POST',
			body: 'test',
			headers: {
				'x-a': '1',
				'content-type': 'text/plain',
			},
		})
		const message = await buildDebugMessage(request, { _debug: 'MyTitle' })
		const expectedMessageText = `
POST https://example.com/API_KEY?_debug=MyTitle

## Headers

Content-Type: text/plain
X-A: 1

## Body

test
		`.trim()
		expect(message).toEqual({ title: 'MyTitle', message: expectedMessageText })
	})

	it('outputs pretty json', async () => {
		const request = new Request('https://example.com/MyApiKey', {
			method: 'POST',
			body: '{"a":1}',
		})
		const message = await buildDebugMessage(request)
		const expected = `
POST https://example.com/API_KEY

## Headers

Content-Type: text/plain;charset=UTF-8

## Body

{
  "a": 1
}
		`.trim()
		expect(message.message).toEqual(expected)
	})
})
