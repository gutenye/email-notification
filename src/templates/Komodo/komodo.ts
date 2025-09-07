import type { Message } from '../../types'
import { formatPercentage } from '../../utils/format'

export function komodo(payload: Payload, params: Params): Message {
	const { type } = payload.data
	const { serverName } = params

	// title
	let action = type
	const handler = handlers[type as keyof typeof handlers]
	if (handler) {
		const result = handler(payload.data.data)
		action = result.action || action
	}
	const title = `[Komodo/${serverName}] ${action}`

	// message
	const komodoUrl = buildKomodoUrl(payload, params)
	const message = `
${komodoUrl}
${JSON.stringify(payload, null, 2)}
		`.trim()

	return {
		title,
		message,
	}
}

function buildKomodoUrl(payload: Payload, params: Params): string {
	const { type, id } = payload.target
	const { komodoHost } = params
	const typePath = `${type.toLowerCase()}s`
	return `${komodoHost}/${typePath}/${id}`
}

const handlers = {
	ScheduleRun({ name }: ScheduleRun): HandlerReturn {
		return {
			action: `run schedule ${name}`,
		}
	},

	ServerCpu({ percentage }: ServerCpu): HandlerReturn {
		return {
			action: `CPU at ${formatPercentage(percentage / 100)}`,
		}
	},

	ServerDisk({ usedGb, totalGb }: ServerDisk): HandlerReturn {
		return {
			action: `disk used at ${formatPercentage(usedGb / totalGb)}`,
		}
	},

	StackAutoUpdated({ name }: StackAutoUpdated): HandlerReturn {
		return {
			action: `${name} image upgraded`,
		}
	},

	StackStateChange({ name, from, to }: StackStateChange): HandlerReturn {
		return {
			action: `${name} ${from} -> ${to}`,
		}
	},
}

export type Data =
	| StackAutoUpdated
	| StackStateChange
	| ServerCpu
	| ServerDisk
	| ScheduleRun

interface Base {
	id: string
	name: string
}

interface StackBase extends Base {
	serverId: string
	serverName: string
}

export interface StackAutoUpdated extends StackBase {
	images: string[]
}

export interface StackStateChange extends StackBase {
	from: string
	to: string
}

interface ServerBase extends Base {
	region: string | null
}

export interface ServerCpu extends ServerBase {
	percentage: number
}

export interface ServerDisk extends ServerBase {
	path: string
	usedGb: number
	totalGb: number
}

export interface ScheduleRun extends Base {
	resourceType: string
}

export type Payload = {
	ts: number
	resolved: boolean
	level: string
	target: {
		type: string
		id: string
	}
	data: {
		type: string
		data: Data
	}
	resolvedTs: number
}

type Params = {
	serverName: string
	komodoHost: string
	skip?: string[]
}

export type MessageData = {
	title: string
	body: string
}

type HandlerReturn = {
	action?: string
}
