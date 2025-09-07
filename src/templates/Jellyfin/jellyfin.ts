import type { Message } from '../../types'

export function jellyfin(payload: Payload): Message {
	const title = buildTitle(payload)
	const message = buildMessage(payload)
	return {
		title,
		message,
	}
}

function buildTitle(payload: Payload): string {
	const { ServerName, NotificationType } = payload
	const itemName = buildItemName(payload)
	let action = NotificationType
	if (NotificationType === 'ItemAdded') {
		action = `Added ${itemName}`
	} else if (NotificationType === 'PlaybackStart') {
		action = `Start playing ${itemName}`
	} else if (NotificationType === 'PlaybackStop') {
		action = `Stop playing ${itemName}`
	}
	return `[Jellyfin/${ServerName}] ${action}`
}

function buildMessage(payload: Payload): string {
	const { ServerUrl, ServerId, ItemId } = payload
	const url = `${ServerUrl}/web/#/details?id=${ItemId}&serverId=${ServerId}`
	return `
${url}
${JSON.stringify(payload, null, 2)}
	`.trim()
}

function buildItemName(payload: Payload): string {
	const { ItemType, SeriesName, SeasonNumber00, EpisodeNumber00, Name } =
		payload
	if (ItemType === 'Season') {
		return SeriesName
	} else if (ItemType === 'Episode') {
		return `${SeriesName} S${SeasonNumber00}E${EpisodeNumber00}`
	} else if (ItemType === 'Movie') {
		return Name
	}
	return Name
}

export type Payload = {
	ServerName: string
	NotificationType: string
	ItemType: string
	SeriesName: string
	Name: string
	ServerUrl: string
	ServerId: string
	ServerVersion: string
	Timestamp: string
	UtcTimestamp: string
	Overview: string
	Tagline: string
	ItemId: string
	RunTimeTicks: number
	RunTime: string
	Year: number
	PremiereDate: string
	SeriesId: string
	SeasonId: string
	SeriesPremiereDate: string
	SeasonNumber: number
	SeasonNumber00: string
	SeasonNumber000: string
	EpisodeNumber: number
	EpisodeNumber00: string
	EpisodeNumber000: string
	Video_0_Title: string
	Video_0_Type: string
	Video_0_Codec: string
	Video_0_Profile: string
	Video_0_Level: number
	Video_0_Height: number
	Video_0_Width: number
	Video_0_AspectRatio: string
	Video_0_Interlaced: boolean
	Video_0_FrameRate: number
	Video_0_VideoRange: string
	Video_0_ColorSpace: string
	Video_0_ColorTransfer: string
	Video_0_ColorPrimaries: string
	Video_0_PixelFormat: string
	Video_0_RefFrames: number
	Audio_0_Title: string
	Audio_0_Type: string
	Audio_0_Language: string
	Audio_0_Codec: string
	Audio_0_Channels: number
	Audio_0_Bitrate: number
	Audio_0_SampleRate: number
	Audio_0_Default: boolean
	PlaybackPositionTicks: number
	PlaybackPosition: string
	MediaSourceId: string
	IsPaused: boolean
	IsAutomated: boolean
	DeviceId: string
	DeviceName: string
	ClientName: string
	PlayMethod: string
	Id: string
	UserId: string
	NotificationUsername: string
	Client: string
	LastActivityDate: string
	LastPlaybackCheckIn: string
	RemoteEndPoint: string
}
