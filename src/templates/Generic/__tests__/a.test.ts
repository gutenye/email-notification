import {
	createExecutionContext,
	env,
	SELF,
	waitOnExecutionContext,
} from 'cloudflare:test'
import { describe, expect, it, vi } from 'vitest'
import worker from '../../../index'

vi.mock('../../../sendEmail', () => ({
	sendEmail: vi.fn().mockResolvedValue({}),
}))

// it('a', async () => {
// 	const request = new Request('https://example.com', { method: 'POST', body: 'MyTitle' })
// 	const env = {}
// 	const response = await handler.fetch(request, env)

// })

// For now, you'll need to do something like this to get a correctly-typed
// `Request` to pass to `worker.fetch()`.
const IncomingRequest = Request<unknown, IncomingRequestCfProperties>

describe('Hello World worker', () => {
	it('responds with Hello World! (unit style)', async () => {
		const request = new IncomingRequest('http://example.com')
		// Create an empty context to pass to `worker.fetch()`.
		const ctx = createExecutionContext()
		const response = await worker.fetch(request, env, ctx)
		// Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
		await waitOnExecutionContext(ctx)
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`)
	})

	it('responds with Hello World! (integration style)', async () => {
		const response = await SELF.fetch('https://example.com')
		expect(await response.text()).toMatchInlineSnapshot(`"Hello World!"`)
	})
})
