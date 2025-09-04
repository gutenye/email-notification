import { buildDebugMessage } from '../buildDebugMessage'
import { describe, it, expect } from 'vitest'

describe('buildDebugMessage', () => {
	it('should build debug message', async () => {
		const request = new Request('https://example.com?a=1', { method: 'POST', body: 'test', headers: {
			'x-a': '1',
			'content-type': 'text/plain',
		} })
		const message = await buildDebugMessage(request)
		const body = `
POST https://example.com/?a=1

## Headers

Content-Type          text/plain
X-A                   1

## Body

test
		`.trim()
		expect(message.body).toEqual(body)
	})
})