import { buildDebugMessage } from './messages/buildDebugMessage'
import { buildTemplateMessage } from './messages/buildTemplateMessage'
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
			// Use the underscore-prefixed `_template` param for configuration to avoid conflicts with app-specific keys (e.g., Sonarr uses "template" as a key)
			// Normal name `template` can be used to custom body value in the future
			const { _debug, _template, ...restParams } = params
			if (_debug !== undefined) {
				message = await buildDebugMessage(request, restParams, env)
			} else if (_template !== undefined) {
				message = await buildTemplateMessage(
					_template,
					request,
					restParams,
					env,
				)
			} else {
				message = await buildTextMessage(request, restParams, env)
			}

			if (message.skip) {
				return okResponse(message)
			}

			const from = params._from || env.DEFAULT_FROM
			const to = params._to || env.DEFAULT_TO
			await sendEmail({ from, to, message, env })
			return okResponse(message)
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
	_from?: string
	_to?: string
	_debug?: string
	_template?: string
	[key: string]: string | undefined
}
