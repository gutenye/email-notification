import { mapValues } from 'lodash-es'
import type { Message } from '~/types'

export function sanitizeMessage(inputMessage: Message, apiKeys: string[]) {
	const message = mapValues(inputMessage, (value) => {
		if (typeof value === 'string') {
			return value.replaceAll(new RegExp(apiKeys.join('|'), 'g'), 'API_KEY')
		}
		return value
	})

	return {
		...message,
		title: message.title || (message.skip ? undefined : 'Notification'),
		message: message.message,
	}
}
