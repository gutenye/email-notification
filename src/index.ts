import { buildDebugMessage } from './messages/buildDebugMessage'
import { buildSimpleMessage } from './messages/buildSimpleMessage'
import { buildTemplateMessage } from './messages/buildTemplateMessage'
import { sendEmail } from './sendEmail'
import type { Message } from './types'
import { errorResponse, okResponse } from './utils'

export default {
	async fetch(request, env): Promise<Response> {
		try {
			const keys = env.API_KEYS.split('\n').map((v) => v.trim())
			const url = new URL(request.url)
			const pathname = url.pathname.slice(1)
			const params = Object.fromEntries(url.searchParams)

			if (!keys.includes(pathname)) {
				return errorResponse('Not found', { status: 404 })
			}

			let message: Message
			if ('debug' in params) {
				message = await buildDebugMessage(request, params)
			} else if (params.template) {
				message = await buildTemplateMessage(request, params)
			} else {
				message = await buildSimpleMessage(request, params)
			}

			const result = await sendEmail({ env, message })
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
