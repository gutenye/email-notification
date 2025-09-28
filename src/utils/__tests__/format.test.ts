import { describe, expect, it } from 'vitest'
import { formatPercentage, formatRecords } from '../format'

describe('formatRecords', () => {
	it('default', () => {
		const records = {
			foo: 'bar',
			baz: 'qux',
		}
		expect(formatRecords(records)).toEqual(
			`
foo: bar
baz: qux
			`.trim(),
		)
	})
})

describe('formatPercentage', () => {
	it('default', () => {
		expect(formatPercentage(0.5)).toEqual('50%')
	})
	it('digits', () => {
		expect(formatPercentage(0.5, 1)).toEqual('50.0%')
	})
})
