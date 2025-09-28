import type { Message } from '#/types'
import { getTemplate } from '../templates'

export async function buildTemplateMessage(
	templateName: string,
	request: Request,
	params: Params,
	env: Env,
): Promise<Message> {
	const template = getTemplate(templateName)
	let payload: string | Record<string, any>
	// type text: ntfy
	payload = await request.text()
	try {
		payload = JSON.parse(payload)
	} catch {}
	return template(payload, params, env)
}

type Params = {
	template: string
	[key: string]: string
}
