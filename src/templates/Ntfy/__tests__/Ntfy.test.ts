import { describe, expect, it } from 'vitest'
import { createInvoke } from '~/test'

const invoke = createInvoke('_template=Ntfy')

describe('topic in body', () => {
	it('works', async () => {
		const invoke = createInvoke('/?_template=Ntfy')
		const { result, expected } = await invoke({
			body: {
				topic: 'testKey',
			},
			expected: { title: 'Ntfy', message: '' },
		})
		expect(result).toEqual(expected)
	})

	it('failed if _template is not ntfy', async () => {
		const invoke = createInvoke('/')
		const { result, expected } = await invoke({
			body: {
				topic: 'testKey',
			},
			expected: expect.objectContaining({
				error: 'Invalid api key',
			}),
		})
		expect(result).toEqual(expected)
	})
})

describe('json body', () => {
	it('works', async () => {
		const { result, expected } = await invoke({
			body: {
				title: 'MyTitle',
				message: 'MyMessage',
			},
			expected: { title: 'MyTitle', message: 'MyMessage' },
		})
		expect(result).toEqual(expected)
	})
})

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
