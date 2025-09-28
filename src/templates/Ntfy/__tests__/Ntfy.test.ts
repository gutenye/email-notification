import { describe, expect, it } from 'vitest'
import { createInvoke } from '#/test'
import type { CreateExpected, Fixture } from '#/test/types'

const invoke = createInvoke('_template=Ntfy')

it('message in body', async () => {
	const { result, expected } = await invoke({
		body: 'MyMessage',
		expected: { title: 'Ntfy', message: 'MyMessage' },
	})
	expect(result).toEqual(expected)
})

it('message in params', async () => {
	const { result, expected } = await invoke({
		path: 'message=MyMessage',
		expected: { title: 'Ntfy', message: 'MyMessage' },
	})
	expect(result).toEqual(expected)
})

it('title in params, message in body', async () => {
	const { result, expected } = await invoke({
		path: 'title=MyTitle',
		body: 'MyMessage',
		expected: { title: 'MyTitle', message: 'MyMessage' },
	})
	expect(result).toEqual(expected)
})

it('title, message in params', async () => {
	const { result, expected } = await invoke({
		path: 'title=MyTitle&message=MyMessage',
		expected: { title: 'MyTitle', message: 'MyMessage' },
	})
	expect(result).toEqual(expected)
})

it('title, message in params, metadata in params', async () => {
	const { result, expected } = await invoke({
		path: 'title=MyTitle&message=MyMessage&foo=bar&baz=qux',
		expected: { title: 'MyTitle', message: 'MyMessage\nfoo: bar\nbaz: qux' },
	})
	expect(result).toEqual(expected)
})
