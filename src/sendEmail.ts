import { EmailMessage } from 'cloudflare:email'
import { createMimeMessage } from 'mimetext'
import type { Message } from './types'

export async function sendEmail({ env, message }: Options) {
	const senderName = 'Notification'
	const senderAddress = env.FROM
	const recipientAddress = env.TO

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
	return message
}

type Options = {
	env: Env
	message: Message
}
