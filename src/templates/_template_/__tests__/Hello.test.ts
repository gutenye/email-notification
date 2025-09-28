import { describe, expect, it } from 'vitest'
import { createInvoke } from '#/test'
import type { CreateExpected, Fixture } from '#/test/types'

const invoke = createInvoke('_template=Hello')

describe.skip('group', () => {
	it('group Hello', async () => {
		const { result, expected } = await invoke({
			body: createBody('StackAutoUpdated'),
			expected: createExpected('[Komodo/Server1] Stack1 image upgraded'),
		})
		expect(result).toEqual(expected)
	})
})
