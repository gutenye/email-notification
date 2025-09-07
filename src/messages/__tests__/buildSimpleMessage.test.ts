import { describe, expect, it } from 'vitest'
import { buildSimpleMessage } from '../buildSimpleMessage'

describe('buildSimpleMessage', () => {
	it('should parse message', () => {
		const message = buildSimpleMessage(new Request('title\nbody'))
		expect(message).toEqual({ title: 'title', body: 'body' })
	})
	it('should parse message with no body', () => {
		const message = buildSimpleMessage(new Request('title'))
		expect(message).toEqual({ title: 'title', body: '' })
	})
	it('should parse message with \\n inbody', () => {
		const message = buildSimpleMessage(new Request('title\\nline1\\nline2'))
		expect(message).toEqual({ title: 'title', body: 'line1\nline2' })
	})
})
