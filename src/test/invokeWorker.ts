import {
	env as cfEnv,
	createExecutionContext,
	waitOnExecutionContext,
} from 'cloudflare:test'
import { vi } from 'vitest'
import worker from '#/index'

const DEFAULT_ENV = {
	API_KEYS: 'testKey',
	DEFAULT_FROM: 'from@test.com',
	DEFAULT_TO: 'to@test.com',
}

export async function invokeWorker(
	path: string,
	fetchOptions: RequestInit,
	inputEnv: Record<string, string> = {},
) {
	const request = new IncomingRequest(`https://test.com${path}`, fetchOptions)
	const ctx = createExecutionContext()
	const env = { ...cfEnv, ...DEFAULT_ENV, ...inputEnv }
	const response = await worker.fetch(request, env, ctx)
	await waitOnExecutionContext(ctx)
	return response
}

vi.mock('#/sendEmail', () => ({
	sendEmail: vi.fn().mockResolvedValue({}),
}))

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>
