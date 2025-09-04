import type { Message } from './types'
import { startCase } from 'lodash-es'


export async function buildDebugMessage(request: Request): Promise<Message> {
	const method = request.method
	const url = request.url
	const bodyText = await request.text()
	const headersText = formatHeaders(request.headers)

	const body = `
${method} ${url}

## Headers

${headersText}

## Body

${bodyText}
	`.trim()

	return {
		title: body.slice(0, 80),
		body,
	}
}

function formatHeaders(headers: Headers) {
	const rows = Array.from(headers.entries()).map(([key, value]) => {
		const newKey = startCase(key).split(' ').join('-')
		return [newKey, value]
	})
	return formatTable(rows)
}


function formatTable(rows: string[][]) {
	const maxKeyLength = Math.max(...rows.map(row => row[0].length))
	return rows.map(row => {
		const key = row[0].padEnd(maxKeyLength, ' ')
		const value = row[1]
		return `${key}          ${value}`
	}).join('\n')
}

