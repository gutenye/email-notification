import type { Message } from '#/types'

export interface Fixture {
	body: Record<string, any>
	path?: string
	env?: Record<string, string>
	expected: Message | CreateExpected
}

export type CreateExpected = (options: { body: Record<string, any> }) => Message
