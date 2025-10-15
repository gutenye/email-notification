import type { Message } from '#/types'
import { formatRecords } from '#/utils'

const DEFAULT_TITLE = 'Ntfy'
const DEFAULT_MESSAGE = ''

export function getApiKey(payload: Payload): string | undefined {
	return payload?.topic
}

export function build(
	inputPayload: Payload,
	params: Params,
	env: Env,
): Message {
	const { title: paramTitle, message: paramMessage, ...restParams } = params
	const payload =
		typeof inputPayload === 'string'
			? { message: inputPayload }
			: inputPayload || {}
	const title = paramTitle || payload.title || DEFAULT_TITLE
	const message = paramMessage || payload.message || DEFAULT_MESSAGE
	const metadata = formatRecords(restParams)
	const finalMessage = [message, metadata].filter(Boolean).join('\n')
	return {
		title,
		message: finalMessage,
	}
}

export type Payload = string | Record<string, any> | undefined

export type Params = {
	title?: string
	message?: string
	priority?: string
}
