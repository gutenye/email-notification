import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'
import type { MessageToSend } from './messages/types'

export async function sendEmail({ from, to, message, env }: Options) {
	const senderName = 'Notification'
	const senderAddress = from
	const recipientAddress = to

	const msg = createMimeMessage()
	msg.setSender({ name: senderName, addr: senderAddress })
	msg.setRecipient(recipientAddress)
	msg.setSubject(message.title)
	msg.addMessage({
		contentType: 'text/plain',
		data: message.message,
	})

	const emailMessage = new EmailMessage(
		senderAddress,
		recipientAddress,
		msg.asRaw(),
	)
	await env.sendEmail.send(emailMessage)
}

type Options = {
	from: string
	to: string
	message: MessageToSend
	env: Env
}
