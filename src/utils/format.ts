export function formatPercentage(value: number, digits = 0) {
	return (value * 100).toFixed(digits) + '%'
}

// Record in { key: value } format, from params or headers
export function formatRecords(records: Record<string, string>) {
	return Object.entries(records)
		.map(([key, value]) => `${key}: ${value}`)
		.join('\n')
}
