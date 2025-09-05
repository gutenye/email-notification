import type { Message } from './types'
import { startCase } from 'lodash-es'


export async function buildDebugMessage(request: Request, { title }: Options = {}): Promise<Message> {
	const method = request.method
	const url = request.url
	const urlText = buildUrlText(url)
	const bodyText = await request.text()
	const headersText = formatHeaders(request.headers)

	const body = `
${method} ${urlText}

## Headers

${headersText}

## Body

${bodyText}
	`.trim()

	return {
		title: title || bodyText.slice(0, 80),
		body,
	}
}

function formatHeaders(headers: Headers) {
	return Array.from(headers.entries()).map(([key, value]) => {
		const newKey = startCase(key).split(' ').join('-')
 		// Email doesn't use mono font, so can't use table whitespace mode
		return `${newKey}: ${value}`
	}).join('\n')
}

// remove api keys
function buildUrlText(urlText: string) {
	const url = new URL(urlText)
	const newPathname = ['/API_KEY', ...url.pathname.slice(1).split('/').slice(1)].join('/')
	return `${url.protocol}//${url.host}${newPathname}${url.search}`
}

type Options = { title?: string }