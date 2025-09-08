import { describe, expect, it } from 'vitest'
import type { Payload } from '../Jellyfin'
import { Jellyfin } from '../Jellyfin'

describe('jellyfin', () => {
	;[
		['ItemAdded.Movie', '[Jellyfin/MyServer] Added MyName'],
		['ItemAdded.Season', '[Jellyfin/MyServer] Added MySeries'],
		['ItemAdded.Episode', '[Jellyfin/MyServer] Added MySeries S01E01'],
		['PlaybackStart', '[Jellyfin/MyServer] Start playing MyName'],
		['PlaybackStop', '[Jellyfin/MyServer] Stop playing MyName'],
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
		ItemType: 'Movie',
		SeriesName: 'MySeries',
		SeasonNumber00: '01',
		EpisodeNumber00: '01',
		Name: 'MyName',
	}

	const fixtureTypes = {
		'ItemAdded.Movie': {
			...common,
			ItemType: 'Movie',
			NotificationType: 'ItemAdded',
		},
		'ItemAdded.Season': {
			...common,
			ItemType: 'Season',
			NotificationType: 'ItemAdded',
		},
		'ItemAdded.Episode': {
			...common,
			ItemType: 'Episode',
			NotificationType: 'ItemAdded',
		},
		PlaybackStart: {
			...common,
			NotificationType: 'PlaybackStart',
		},
		PlaybackStop: {
			...common,
			NotificationType: 'PlaybackStop',
		},
	}

	return fixtureTypes[name as keyof typeof fixtureTypes] as Payload
}
