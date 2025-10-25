import {
	env as cfEnv,
	createExecutionContext,
	waitOnExecutionContext,
} from 'cloudflare:test'
import { isPlainObject } from 'lodash-es'
import { vi } from 'vitest'
import worker from '~/index'
import type { Fixture } from './types'

const DEFAULT_ENV = {
	API_KEYS: 'testKey',
	DEFAULT_FROM: 'from@test.com',
	DEFAULT_TO: 'to@test.com',
}

// invoke({ path: 'a=1&b=2', body: 'a' | {a: 1 }, env, expected: { title, message } })
export function createInvoke(base: string = '') {
	return async function invoke({ body, path, env = {}, expected }: Fixture) {
		const newBody = isPlainObject(body) ? JSON.stringify(body) : body
		const newBasePath = base.startsWith('/')
			? base
			: `/testKey${base ? `?${base}` : ''}`
		const response = await invokeWorker(
			`${newBasePath}${path ? `&${path}` : ''}`,
			{
				method: 'POST',
				body: newBody,
			},
			env,
		)
		if (typeof expected === 'function') {
			expected = expected({ body })
		}
		return {
			result: await response.json(),
			expected,
		}
	}
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

vi.mock('~/sendEmail', () => ({
	sendEmail: vi.fn().mockResolvedValue({}),
}))

const IncomingRequest = Request<unknown, IncomingRequestCfProperties>
