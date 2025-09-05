import { startCase } from 'lodash-es'
import type { Message } from './types'

export async function buildDebugMessage(
  request: Request,
  { debug: title }: Options = {},
): Promise<Message> {
  const method = request.method
  const url = request.url
  const urlText = buildUrlText(url)
  const messageText = await request.text()
  const headersText = formatHeaders(request.headers)

  const message = `
${method} ${urlText}

## Headers

${headersText}

## Body

${messageText}
	`.trim()

  return {
    title: title || messageText.slice(0, 80),
    message,
  }
}

function formatHeaders(headers: Headers) {
  return Array.from(headers.entries())
    .map(([key, value]) => {
      const newKey = startCase(key).split(' ').join('-')
      // Email doesn't use mono font, so can't use table whitespace mode
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

type Options = { title?: string }
