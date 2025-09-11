import { getTemplate } from '#/templates'
import type { Message } from '#/types'

export async function buildTemplateMessage(
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
