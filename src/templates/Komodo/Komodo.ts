import pluralize from 'pluralize'
import type { Message } from '../../types'
import { formatPercentage } from '../../utils/format'

export function Komodo(payload: Payload, params: Params, env: Env): Message {
	const { type } = payload.data
	const { serverName } = params

	// skip
	const skip = params.skip?.split(',') || env.KOMODO_SKIP?.split(',') || []
	if (skip.includes(type)) {
		return {
			skip: `Skipped ${type}`,
		}
	}

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
			action: `Run schedule ${name}`,
		}
	},

	ServerCpu({ percentage }: ServerCpu): HandlerReturn {
		return {
			action: `CPU at ${formatPercentage(percentage / 100)}`,
		}
	},

	ServerDisk({ used_gb, total_gb }: ServerDisk): HandlerReturn {
		return {
			action: `Disk used at ${formatPercentage(used_gb / total_gb)}`,
		}
	},

	ServerUnreachable({ err }: ServerUnreachable): HandlerReturn {
		return {
			action: `Server unreachable for ${err.error}`,
		}
	},

	ServerVersionMismatch({
		server_version,
		core_version,
	}: ServerVersionMismatch): HandlerReturn {
		return {
			action: `Server version mismatch: ${core_version} vs ${server_version}`,
		}
	},

	StackAutoUpdated({ name, images }: StackAutoUpdated): HandlerReturn {
		const imagesName = images.map(getImageName).join(', ')
		return {
			action: `${name} ${imagesName} ${pluralize('images', images.length)} upgraded`,
		}
	},

	StackStateChange({ name, from, to }: StackStateChange): HandlerReturn {
		return {
			action: `${name} ${from} -> ${to}`,
		}
	},

	StackImageUpdateAvailable({
		name,
		image,
	}: StackImageUpdateAvailable): HandlerReturn {
		const imageName = getImageName(image)
		return {
			action: `${name} ${imageName} update available`,
		}
	},

	ResourceSyncPendingUpdates({
		name,
	}: ResourceSyncPendingUpdates): HandlerReturn {
		return {
			action: `Sync '${name}' is pending for updates`,
		}
	},
}

function getImageName(url: string): string {
	return url.split(':')[0].split('/').pop() || 'UnknownImage'
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

export interface StackImageUpdateAvailable extends StackBase {
	service: string
	image: string
}

interface ServerBase extends Base {
	region: string | null
}

export interface ServerCpu extends ServerBase {
	percentage: number
}

export interface ServerDisk extends ServerBase {
	path: string
	used_gb: number
	total_gb: number
}

export interface ServerUnreachable extends ServerBase {
	err: {
		error: string
		trace: string[]
	}
}

export interface ServerVersionMismatch extends ServerBase {
	server_version: string
	core_version: string
}

export interface ScheduleRun extends Base {
	resource_type: string
}

export interface ResourceSyncPendingUpdates extends Base {}

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
	resolved_ts: number
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
