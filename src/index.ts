import invariant from 'tiny-invariant'
import { buildDebugMessage } from './messages/buildDebugMessage'
import { buildTemplateMessage } from './messages/buildTemplateMessage'
import { buildTextMessage } from './messages/buildTextMessage'
import { sanitizeMessage } from './messages/santizeMessage'
import { sendEmail } from './sendEmail'
import type { Message, MessageToSend } from './types'
import {
	errorResponse,
	getCorsHeaders,
	okResponse,
	timingSafeEqualSome,
} from './utils'

export default {
	async fetch(request, env): Promise<Response> {
		const corsHeaders = getCorsHeaders({ request, env })

		try {
			const keys = env.API_KEYS.split('\n').map((v) => v.trim())
			const url = new URL(request.url)
			const pathname = url.pathname.slice(1)
			const params = Object.fromEntries(url.searchParams) as Params
			// Use the underscore-prefixed `_template` param for configuration to avoid conflicts with app-specific keys (e.g., Sonarr uses "template" as a key)
			// Normal name `template` can be used to custom body value in the future
			const { _debug, _template, ...restParams } = params
			const validateApiKey = createValidateApiKey(keys, pathname)

			let message: Message
			// handle api key in body case
			if (_template !== undefined) {
				message = await buildTemplateMessage(
					_template,
					request,
					restParams,
					env,
					validateApiKey,
				)
			} else {
				validateApiKey()

				if (_debug !== undefined) {
					message = await buildDebugMessage(request, restParams, env)
				} else {
					message = await buildTextMessage(request, restParams, env)
				}
			}

			message = sanitizeMessage(message, keys)

			if (message.skip) {
				return okResponse(message, { headers: corsHeaders })
			}

			const from = params._from || env.DEFAULT_FROM
			const to = params._to || env.DEFAULT_TO
			const messageToSend = buildMessageToSend(message)
			await sendEmail({ from, to, message: messageToSend, env })
			return okResponse(message, { headers: corsHeaders })
		} catch (error) {
			console.error(error)
			if (error instanceof Error) {
				return errorResponse(error, { headers: corsHeaders })
			}
			return errorResponse('An unknown error occurred', {
				headers: corsHeaders,
			})
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

function createValidateApiKey(keys: string[], defaultApiKey: string) {
	return function validateApiKey(apiKey?: string) {
		const newApiKey = apiKey || defaultApiKey
		if (!timingSafeEqualSome(keys, newApiKey)) {
			const error = new Error('Invalid api key')
			error.httpStatus = 404
			throw error
		}
	}
}

function buildMessageToSend(message: Message): MessageToSend {
	invariant(message.title, 'Message is missing title')
	return {
		title: message.title,
		message: message.message || '',
	}
}
