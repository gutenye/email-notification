export function mapKeysDeep(input: unknown, callback: (key: string) => string) {
	if (Array.isArray(input)) {
		return input.map((v) => mapKeysDeep(v, callback))
	} else if (
		input &&
		typeof input === 'object' &&
		input.constructor === Object
	) {
		return Object.fromEntries(
			Object.entries(input).map(([k, v]) => [
				callback(k),
				mapKeysDeep(v, callback),
			]),
		)
	}
	return input
}
