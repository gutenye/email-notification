import { describe, expect, it } from 'vitest'
import { createInvoke } from '#/test'

describe('authentication', () => {
	it('works with correct api key', async () => {
		const invoke = createInvoke('/testKey')
		const { result, expected } = await invoke({
			body: 'MyTitle',
			expected: { title: 'MyTitle', message: '' },
		})
		expect(result).toEqual(expected)
	})

	it('failed with incorrect api key', async () => {
		const invoke = createInvoke('/incorrectKey')
		const { result, expected } = await invoke({
			body: 'MyTitle',
			expected: expect.objectContaining({
				error: 'Invalid api key',
			}),
		})
		expect(result).toEqual(expected)
	})

	it('template: works with correct api key', async () => {
		const invoke = createInvoke('/testKey?_template=Generic')
		const { result, expected } = await invoke({
			body: {
				title: 'MyTitle',
			},
			expected: { title: 'MyTitle' },
		})
		expect(result).toEqual(expected)
	})

	it('template: failed with incorrect api key', async () => {
		const invoke = createInvoke('/?_template=Generic')
		const { result, expected } = await invoke({
			body: {
				title: 'MyTitle',
			},
			expected: expect.objectContaining({
				error: 'Invalid api key',
			}),
		})
		expect(result).toEqual(expected)
	})
})

describe('template', () => {
	it('template name lower case', async () => {
		const invoke = createInvoke('_template=generic')
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
})
