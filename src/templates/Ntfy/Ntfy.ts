import type { Message } from '../../types'

const DEFAULT_TITLE = 'Ntfy'
const DEFAULT_MESSAGE = ''

export function Ntfy(payload: Payload, params: Params, env: Env): Message {
	const title = params.title || DEFAULT_TITLE
	const message = params.message || payload || DEFAULT_MESSAGE
	return {
		title,
		message,
	}
}

export type Payload = string | undefined

export type Params = {
	title?: string
	message?: string
}
