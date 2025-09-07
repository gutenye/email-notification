import type { Message } from '../../types'

export function hello(payload: Payload): Message {
	const title = buildTitle(payload)
	const message = buildMessage(payload)
	return {
		title,
		message,
	}
}

function buildTitle(payload: Payload): string {
	const { serverName, type } = payload
	const itemName = buildItemName(payload)
	let action = type
	if (type === 'Type1') {
		action = `Type1 ${itemName}`
	} else if (type === 'Type2') {
		action = `Type2 ${itemName}`
	}
	return `[Hello/${serverName}] ${action}`
}

function buildMessage(payload: Payload): string {
	const { serverUrl, itemId } = payload
	const itemUrl = `${serverUrl}/${itemId}`
	return `
${itemUrl}
${JSON.stringify(payload, null, 2)}
	`.trim()
}

export type Payload = {
	serverName: string
	type: string
	itemId: string
	serverUrl: string
}
