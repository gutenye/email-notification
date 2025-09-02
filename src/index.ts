import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const keys = env.API_KEYS.split('\n').map(line => line.split(':')[1].trim())

		const url = new URL(request.url)
		const pathname = url.pathname.slice(1)
		if (!keys.includes(pathname)) {
			return new Response('Invalid API key', { status: 401 })
		}

		const senderName = 'Notification'
		const senderAddress = env.FROM
		const recipientAddress = env.TO
		const body = await request.text()
		const [title, message] = body.split(/:(.*)/).map(v => v.trim())

		const msg = createMimeMessage()
		msg.setSender({ name: senderName, addr: senderAddress })
		msg.setRecipient(recipientAddress)
		msg.setSubject(title)
		msg.addMessage({
			contentType: 'text/plain',
			data: message || '',
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
