import { serializeError } from './error'

// Response
//
// { error: message, name: undefined, stack, .. }
// { ANY }
//
// errorResponse(error | string)
// okResponse(data | undefined)

export function okResponse(
	data: Record<string, unknown> = {},
	headers: Record<string, string> = {},
) {
	return jsonResponse(data, headers)
}

export function errorResponse(
	inputError: string | Error,
	headers: Record<string, string> = {},
) {
	let result: Record<string, unknown>
	if (inputError instanceof Error) {
		const { message, ...rest } = serializeError(inputError)
		result = { error: message, ...rest }
	} else {
		result = { error: inputError }
	}
	return jsonResponse(result, headers)
}

export function jsonResponse(
	body: Record<string, unknown>,
	headers: Record<string, string> = {},
) {
	return new Response(JSON.stringify(body), {
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
	})
}
