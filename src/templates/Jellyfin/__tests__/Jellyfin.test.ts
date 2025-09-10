import { describe, expect, it } from 'vitest'
import type { Payload } from '../Jellyfin'
import { Jellyfin } from '../Jellyfin'

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
		it(name, () => {
			const fixture = createFixture(name)
			const result = Jellyfin(fixture)
			const expected = {
				title,
				message: `
https://jellyfin.com/web/#/details?id=itemId1&serverId=serverId1
${JSON.stringify(fixture, null, 2)}
      `.trim(),
			}
			expect(result).toEqual(expected)
		})
	})
})

function createFixture(name: string): Payload {
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

	const fixtureTypes = {
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

	return fixtureTypes[name as keyof typeof fixtureTypes] as Payload
}
