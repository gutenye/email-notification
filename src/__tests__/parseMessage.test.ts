import { parseMessage } from '../parseMessage'
import { describe, it, expect } from 'vitest'

describe('parseMessage', () => {
	it('should parse message', () => {
		const message = parseMessage('title\nbody')
		expect(message).toEqual({ title: 'title', body: 'body' })
	})
	it('should parse message with no body', () => {
		const message = parseMessage('title')
		expect(message).toEqual({ title: 'title', body: '' })
	})
	it('should parse message with \\n inbody', () => {
		const message = parseMessage('title\\nline1\\nline2')
		expect(message).toEqual({ title: 'title', body: 'line1\nline2' })
	})
})