import type { Message } from '~/types'

export async function buildTextMessage(
	request: Request,
	params: Params = {},
	env: Env,
): Promise<Message> {
	const { title } = params
	const body = await request.text()
	if (title) {
		return { title, message: body }
	} else {
		const parts = body
			.replaceAll('\\n', '\n')
			.split(/\n(.*)/s)
			.map((v) => v.trim())
		const title = parts[0]
		const message = parts[1]
		return { title, message }
	}
}

type Params = {
	title?: string
}
