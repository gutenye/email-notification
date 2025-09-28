import type { Message } from '#/types'

export interface Fixture {
	path?: string
	body?: string | Record<string, any>
	env?: Record<string, string>
	expected: Message | CreateExpected
}

export type CreateExpected = (options: { body: Record<string, any> }) => Message
