import { buildDebugMessage } from './messages/buildDebugMessage'
import { buildSimpleMessage } from './messages/buildSimpleMessage'
import { buildTemplateMessage } from './messages/buildTemplateMessage'
import { sendEmail } from './sendEmail'
import type { Message } from './types'

export default {
	async fetch(request, env): Promise<Response> {
		const keys = env.API_KEYS.split('\n').map((line: string) =>
			line.split(':')[1].trim(),
		)
		const url = new URL(request.url)
		const pathname = url.pathname.slice(1)
		const params = Object.fromEntries(url.searchParams)

		if (!keys.includes(pathname)) {
			return new Response('Not found', { status: 404 })
		}

		let message: Message
		if ('debug' in params) {
			message = await buildDebugMessage(request, params)
		} else if (params.template) {
			message = await buildTemplateMessage(request, params)
		} else {
			message = await buildSimpleMessage(request, params)
		}

		try {
			await sendEmail({ env, message })
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message)
			}
			return new Response('An unknown error occurred')
		}

		return new Response('OK')
	},
} satisfies ExportedHandler<Env>
