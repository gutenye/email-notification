import type { Message } from '#/types'

export async function buildSimpleMessage(
	request: Request,
	options: Options,
): Promise<Message> {
	const body = await request.text()
	const parts = body
		.replaceAll('\\n', '\n')
		.split(/\n(.*)/s)
		.map((v) => v.trim())
	const title = parts[0]
	const message = parts[1] || ''
	return { title, message }
}

type Options = {}
