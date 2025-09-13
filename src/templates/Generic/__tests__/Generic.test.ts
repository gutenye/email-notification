import { describe, expect, it } from 'vitest'
import { invokeWorker } from '#/test'

describe('Generic', () => {
	;(
		[
			// path, body, (expected) title, message
			[
				'',
				'{ "title": "MyTitle", "message": "MyMessage" }',
				'MyTitle',
				'MyMessage',
			],
			[
				'titleKey=a&messageKey=b',
				'{ "a": "MyTitle", "b": "MyMessage" }',
				'MyTitle',
				'MyMessage',
			],
		] as Fixture[]
	).forEach(([path, body, title, message]) => {
		it(path, async () => {
			const response = await invokeWorker(`/testKey?template=Generic&${path}`, {
				method: 'POST',
				body,
			})
			expect(await response.json()).toEqual({
				title,
				message,
			})
		})
	})
})

type Fixture = [string, string, string, string]
