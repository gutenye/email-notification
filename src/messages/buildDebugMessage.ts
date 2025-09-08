import { startCase } from 'lodash-es'
import type { Message } from '#/types'

export async function buildDebugMessage(
	request: Request,
	params: Params = {},
): Promise<Message> {
	const method = request.method
	const url = request.url
	const urlText = buildUrlText(url)
	const headersText = formatHeaders(request.headers)
	const { debug: inpuTitle } = params

	let messageText = await request.text()
	try {
		// Try to pretty print json
		messageText = JSON.stringify(JSON.parse(messageText), null, 2)
	} catch {
		// ignore
	}

	const title = inpuTitle || messageText.slice(0, 80)
	const message = `
${method} ${urlText}

## Headers

${headersText}

## Body

${messageText}
	`.trim()

	return {
		title,
		message,
	}
}

function formatHeaders(headers: Headers) {
	return Array.from(headers.entries())
		.map(([key, value]) => {
			const newKey = startCase(key).split(' ').join('-')
			// Email doesn't use mono font, so can't use format it into table
			return `${newKey}: ${value}`
		})
		.join('\n')
}

// remove api keys
function buildUrlText(urlText: string) {
	const url = new URL(urlText)
	const newPathname = [
		'/API_KEY',
		...url.pathname.slice(1).split('/').slice(1),
	].join('/')
	return `${url.protocol}//${url.host}${newPathname}${url.search}`
}

type Params = { debug?: string }
