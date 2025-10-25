import { describe, expect, it } from 'vitest'
import { createInvoke } from '~/test'
import type { CreateExpected } from '~/test/types'
import type { Payload } from '../Jellyfin'

const invoke = createInvoke('_template=Jellyfin')

describe('ItemAdded', () => {
	it('Movie', async () => {
		const { result, expected } = await invoke({
			body: createBody('ItemAdded.Movie'),
			expected: createExpected('[Jellyfin/MyServer] Added MovieTitle'),
		})
		expect(result).toEqual(expected)
	})

	it('Series', async () => {
		const { result, expected } = await invoke({
			body: createBody('ItemAdded.Series'),
			expected: createExpected('[Jellyfin/MyServer] Added ShowTitle'),
		})
		expect(result).toEqual(expected)
	})

	it('Season', async () => {
		const { result, expected } = await invoke({
			body: createBody('ItemAdded.Season'),
			expected: createExpected('[Jellyfin/MyServer] Added ShowTitle S01'),
		})
		expect(result).toEqual(expected)
	})

	it('SeasonUnknown', async () => {
		const { result, expected } = await invoke({
			body: createBody('ItemAdded.SeasonUnknown'),
			expected: createExpected('[Jellyfin/MyServer] Added ShowTitle S'),
		})
		expect(result).toEqual(expected)
	})

	it('Episode', async () => {
		const { result, expected } = await invoke({
			body: createBody('ItemAdded.Episode'),
			expected: createExpected('[Jellyfin/MyServer] Added ShowTitle S01E01'),
		})
		expect(result).toEqual(expected)
	})

	it('EpisodeUnknown', async () => {
		const { result, expected } = await invoke({
			body: createBody('ItemAdded.EpisodeUnknown'),
			expected: createExpected('[Jellyfin/MyServer] Added ShowTitle S01E'),
		})
		expect(result).toEqual(expected)
	})
})

describe('Playback', () => {
	it('PlaybackStart', async () => {
		const { result, expected } = await invoke({
			body: createBody('PlaybackStart'),
			expected: createExpected('[Jellyfin/MyServer] Start playing MovieTitle'),
		})
		expect(result).toEqual(expected)
	})

	it('PlaybackStop', async () => {
		const { result, expected } = await invoke({
			body: createBody('PlaybackStop'),
			expected: createExpected('[Jellyfin/MyServer] Stop playing MovieTitle'),
		})
		expect(result).toEqual(expected)
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

function createExpected(title: string): CreateExpected {
	return ({ body }) => ({
		title,
		message: `
https://jellyfin.com/web/#/details?id=itemId1&serverId=serverId1
${JSON.stringify(body, null, 2)}
      `.trim(),
	})
}
