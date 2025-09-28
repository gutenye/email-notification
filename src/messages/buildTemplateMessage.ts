import type { Message } from '#/types'
import { getTemplate } from '../templates'

export async function buildTemplateMessage(
	request: Request,
	params: Params,
	env: Env,
): Promise<Message> {
	const template = getTemplate(params.template)
	let payload: string | Record<string, any>
	// type text: ntfy
	try {
		payload = await request.json()
	} catch {
		payload = await request.text()
	}
	return template(payload, params, env)
}

type Params = {
	template: string
	[key: string]: string
}
