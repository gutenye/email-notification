import { describe, expect, it } from 'vitest'
import { buildDebugMessage } from '../buildDebugMessage'

describe('buildDebugMessage', () => {
	it('should build debug message', async () => {
		const request = new Request('https://email.example.com/apikey?a=1', {
			method: 'POST',
			body: 'test',
			headers: {
				'x-a': '1',
				'content-type': 'text/plain',
			},
		})
		const message = await buildDebugMessage(request, { title: 'title1' })
		const body = `
POST https://email.example.com/API_KEY?a=1

## Headers

Content-Type: text/plain
X-A: 1

## Body

test
		`.trim()
		expect(message).toEqual({ title: 'title1', body })
	})
})
