import type { Message } from '#/types'
import { getTemplate } from '../templates'

export async function buildJsonMessage(
	request: Request,
	params: Params,
	env: Env,
): Promise<Message> {
	const template = getTemplate(params.template)
	const payload = await request.json()
	return template(payload, params, env)
}

type Params = {
	template: string
	[key: string]: string
}
