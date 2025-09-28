import type { Message } from '#/types'
import { formatRecords } from '#/utils'

const DEFAULT_TITLE = 'Ntfy'
const DEFAULT_MESSAGE = ''

export function Ntfy(payload: Payload, params: Params, env: Env): Message {
	const { title: paramTitle, message: paramMessage, ...restParams } = params
	const title = paramTitle || DEFAULT_TITLE
	const message = paramMessage || payload || DEFAULT_MESSAGE
	const metadata = formatRecords(restParams)
	const finalMessage = [message, metadata].filter(Boolean).join('\n')
	return {
		title,
		message: finalMessage,
	}
}

export type Payload = string | undefined

export type Params = {
	title?: string
	message?: string
	priority?: string
}
