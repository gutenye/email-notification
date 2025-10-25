import type { Message } from '~/types'
import { getTemplate } from '../templates'

export async function buildTemplateMessage(
	templateName: string,
	request: Request,
	params: Params,
	env: Env,
	validateApiKey: (apiKey?: string) => void,
): Promise<Message> {
	const template = getTemplate(templateName)

	// get payload
	let payload: string | Record<string, any>
	// type text: ntfy
	payload = await request.text()
	try {
		payload = JSON.parse(payload)
	} catch {}

	// valiate api key
	let apiKey: string | undefined
	if (template.getApiKey) {
		apiKey = template.getApiKey(payload, params, env)
	}
	validateApiKey(apiKey)

	// run template
	return template.build(payload, params, env)
}

type Params = {
	template: string
	[key: string]: string
}
