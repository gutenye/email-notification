import { get } from 'lodash-es'
import type { Message } from '../../types'

export function Generic(payload: Payload, params: Params): Message {
	const { titleKey, messageKey } = params
	return {
		title: get(payload, titleKey || 'title'),
		message: get(payload, messageKey || 'message'),
	}
}

export type Payload = {
	title: string
	message: string
}

export type Params = {
	titleKey?: string
	messageKey?: string
}
