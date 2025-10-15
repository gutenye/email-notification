import invariant from 'tiny-invariant'
import type { Message } from '../types'
import * as Generic from './Generic/Generic'
import * as Jellyfin from './Jellyfin/Jellyfin'
import * as Komodo from './Komodo/Komodo'
import * as Ntfy from './Ntfy/Ntfy'

export function getTemplate(templateName: string): Template {
	const template = templates[templateName.toLowerCase()]
	invariant(template, `getTemplate: template '${templateName}' not found`)
	return template
}

const templates: Record<string, Template | undefined> = {
	komodo: Komodo,
	jellyfin: Jellyfin,
	generic: Generic,
	ntfy: Ntfy,
}

type Template = {
	build: (payload: any, params: any, env: Env) => Message
	getApiKey?: (payload: any, params: any, env: Env) => string | undefined
}
