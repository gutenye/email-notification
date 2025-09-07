import { getTemplate } from '#/templates'
import type { Message } from '#/types'

export async function buildTemplateMessage(
	request: Request,
	params: Options,
): Promise<Message> {
	const template = getTemplate(params.template)
	const payload = await request.json()
	return template(payload, params)
}

type Options = {
	template: string
}
