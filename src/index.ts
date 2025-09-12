import { buildDebugMessage } from './messages/buildDebugMessage'
import { buildJsonMessage } from './messages/buildJsonMessage'
import { buildTextMessage } from './messages/buildTextMessage'
import { sendEmail } from './sendEmail'
import type { Message } from './types'
import { errorResponse, okResponse } from './utils'

export default {
	async fetch(request, env): Promise<Response> {
		try {
			const keys = env.API_KEYS.split('\n').map((v) => v.trim())
			const url = new URL(request.url)
			const pathname = url.pathname.slice(1)
			const params = Object.fromEntries(url.searchParams) as Params

			if (!keys.includes(pathname)) {
				return errorResponse('Invalid api key', { status: 404 })
			}

			let message: Message
			if ('debug' in params) {
				message = await buildDebugMessage(request, params, env)
			} else if (params.template) {
				message = await buildJsonMessage(request, params, env)
			} else {
				message = await buildTextMessage(request, params, env)
			}

			if (message.skip) {
				return okResponse(message)
			}

			const from = params.from || env.DEFAULT_FROM
			const to = params.to || env.DEFAULT_TO
			const result = await sendEmail({ from, to, message, env })
			return okResponse(result)
		} catch (error) {
			console.error(error)
			if (error instanceof Error) {
				return errorResponse(error)
			}
			return errorResponse('An unknown error occurred')
		}
	},
} satisfies ExportedHandler<Env>

type Params = {
	from?: string
	to?: string
	template?: string
	title?: string
	debug?: string
	[key: string]: string | undefined
}
