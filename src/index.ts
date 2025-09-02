import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const senderName = 'Hello'
		const senderAddress = env.SENDER
		const recipientAddress = env.RECIPIENT
		const subject = 'An email generated in a worker'
		const message = `Congratulations, you just sent an email from a worker.`

		const msg = createMimeMessage()
		msg.setSender({ name: senderName, addr: senderAddress })
		msg.setRecipient(recipientAddress)
		msg.setSubject(subject)
		msg.addMessage({
			contentType: 'text/plain',
			data: message,
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

		return new Response('Hello Send Email World!')
	},
} satisfies ExportedHandler<Env>
