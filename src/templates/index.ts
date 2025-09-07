import type { Message } from '../types'
import { komodo } from './komodo/komodo'
import invariant from 'tiny-invariant'

export function getTemplate(templateName: string): Template {
  const template = templates[templateName]  
  invariant(template, `getTemplate: template '${templateName}' not found`)
  return template
}

const templates: Record<string, Template | undefined> = {
	komodo,
}

type Template = (payload: any, params: any) => Message
