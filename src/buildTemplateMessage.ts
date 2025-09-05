import { templates } from './templates'
import type { Message } from './types'

export async function buildTemplateMessage(
  request: Request,
  params: Options,
): Promise<Message> {
  const { template } = params
  const templateFunction = templates[template]
  if (!templateFunction) {
    throw new Error(`Template ${template} not found`)
  }
  const payload = await request.json()
  return templateFunction(payload, params)
}

type Options = { template: string }
