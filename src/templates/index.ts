import invariant from 'tiny-invariant'
import type { Message } from '../types'
import { Generic } from './Generic/Generic'
import { Jellyfin } from './Jellyfin/Jellyfin'
import { Komodo } from './Komodo/Komodo'

export function getTemplate(templateName: string): Template {
	const template = templates[templateName]
	invariant(template, `getTemplate: template '${templateName}' not found`)
	return template
}

const templates: Record<string, Template | undefined> = {
	Komodo,
	Jellyfin,
	Generic,
}

type Template = (payload: any, params: any) => Message
