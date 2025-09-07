export function serializeError(error: Error) {
	return {
		...error,
		name: error.name,
		message: error.message,
		stack: error.stack,
	}
}
