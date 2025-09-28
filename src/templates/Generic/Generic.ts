import { get } from 'lodash-es'
import type { Message } from '../../types'

export function Generic(payload: Payload, params: Params): Message {
	const { _titleKey, _messageKey } = params
	return {
		title: get(payload, _titleKey || 'title'),
		message: get(payload, _messageKey || 'message'),
	}
}

export type Payload = {
	title: string
	message: string
}

export type Params = {
	_titleKey?: string
	_messageKey?: string
}
