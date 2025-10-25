import { describe, expect, it } from 'vitest'
import { createInvoke } from '~/test'
import type { CreateExpected, Fixture } from '~/test/types'

const invoke = createInvoke('_template=Generic')

it('default', async () => {
	const { result, expected } = await invoke({
		body: {
			title: 'MyTitle',
			message: 'MyMessage',
		},
		expected: {
			title: 'MyTitle',
			message: 'MyMessage',
		},
	})
	expect(result).toEqual(expected)
})

it('custom _titleKey, _messageKey', async () => {
	const { result, expected } = await invoke({
		path: '_titleKey=a&_messageKey=b',
		body: {
			a: 'MyTitle',
			b: 'MyMessage',
		},
		expected: {
			title: 'MyTitle',
			message: 'MyMessage',
		},
	})
	expect(result).toEqual(expected)
})
