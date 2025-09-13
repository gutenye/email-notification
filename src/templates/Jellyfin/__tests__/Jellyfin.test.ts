import { describe, expect, it } from 'vitest'
import type { Payload } from '../Jellyfin'
import { invokeWorker } from '#/test'

describe('jellyfin', () => {
	;[
		['ItemAdded.Movie', '[Jellyfin/MyServer] Added MovieTitle'],
		['ItemAdded.Series', '[Jellyfin/MyServer] Added ShowTitle'],
		['ItemAdded.Season', '[Jellyfin/MyServer] Added ShowTitle S01'],
		['ItemAdded.SeasonUnknown', '[Jellyfin/MyServer] Added ShowTitle S'],
		['ItemAdded.Episode', '[Jellyfin/MyServer] Added ShowTitle S01E01'],
		['ItemAdded.EpisodeUnknown', '[Jellyfin/MyServer] Added ShowTitle S01E'],
		['PlaybackStart', '[Jellyfin/MyServer] Start playing MovieTitle'],
		['PlaybackStop', '[Jellyfin/MyServer] Stop playing MovieTitle'],
	].forEach(([name, title]) => {
		it(name, async() => {
			const body = createBody(name)
			const response = await invokeWorker(`/testKey?template=Jellyfin`, {
				method: 'POST',
				body: JSON.stringify(body),
			})
			expect(await response.json()).toEqual( {
				title,
				message: `
https://jellyfin.com/web/#/details?id=itemId1&serverId=serverId1
${JSON.stringify(body, null, 2)}
      `.trim(),
		})
		})
	})
})

function createBody(name: string): Payload {
	const common = {
		ServerName: 'MyServer',
		ServerUrl: 'https://jellyfin.com',
		ServerId: 'serverId1',
		ItemId: 'itemId1',
	}
	const movie = {
		ItemType: 'Movie',
		Name: 'MovieTitle',
	}
	const series = {
		ItemType: 'Series',
		Name: 'ShowTitle',
	}
	const season = {
		ItemType: 'Season',
		SeriesName: 'ShowTitle',
		SeasonNumber00: '01',
		Name: 'Season 1',
	}
	const eposide = {
		ItemType: 'Episode',
		SeriesName: 'ShowTitle',
		SeasonNumber00: '01',
		EpisodeNumber00: '01',
	}

	const fixtureTypes: Record<string, any> = {
		'ItemAdded.Movie': {
			...common,
			...movie,
			NotificationType: 'ItemAdded',
		},
		'ItemAdded.Series': {
			...common,
			...series,
			NotificationType: 'ItemAdded',
		},
		'ItemAdded.Season': {
			...common,
			...season,
			NotificationType: 'ItemAdded',
		},
		'ItemAdded.SeasonUnknown': {
			...common,
			...season,
			NotificationType: 'ItemAdded',
			Name: 'Season Unknown',
			SeasonNumber00: undefined,
		},
		'ItemAdded.Episode': {
			...common,
			...eposide,
			NotificationType: 'ItemAdded',
		},
		'ItemAdded.EpisodeUnknown': {
			...common,
			...eposide,
			NotificationType: 'ItemAdded',
			Name: 'MySeries',
			EpisodeNumber00: undefined,
		},

		PlaybackStart: {
			...common,
			...movie,
			NotificationType: 'PlaybackStart',
		},
		PlaybackStop: {
			...common,
			...movie,
			NotificationType: 'PlaybackStop',
		},
	}

	return fixtureTypes[name] as Payload
}
