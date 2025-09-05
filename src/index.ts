import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'
import { parseMessage } from './parseMessage'
import type { Message } from './types'
import { buildDebugMessage } from './buildDebugMessage'

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const keys = env.API_KEYS.split('\n').map(line => line.split(':')[1].trim())
		const url = new URL(request.url)
		const pathname = url.pathname.slice(1)
		const params = Object.fromEntries(url.searchParams)

		if (!keys.includes(pathname)) {
			return new Response('Not found', { status: 404 })
		}

		const senderName = 'Notification'
		const senderAddress = env.FROM
		const recipientAddress = env.TO

		let message: Message
		const isDebug = 'debug' in params
		if (isDebug) {
			message = await buildDebugMessage(request, params)
		} else {
			const body = await request.text()
			message = parseMessage(body)
		}

		if (!isDebug) {
			console.log(message.title)
		}
		console.log(message.body)

		const msg = createMimeMessage()
		msg.setSender({ name: senderName, addr: senderAddress })
		msg.setRecipient(recipientAddress)
		msg.setSubject(message.title)
		msg.addMessage({
			contentType: 'text/plain',
			data: message.body,
		})

		const emailMessage = new EmailMessage(senderAddress, recipientAddress, msg.asRaw())
		try {
			await env.sendEmail.send(emailMessage)
		} catch (error) {
			if (error instanceof Error) {
				return new Response(error.message)
			}
			return new Response('An unknown error occurred')
		}

		return new Response('Success')
	},
} satisfies ExportedHandler<Env>
