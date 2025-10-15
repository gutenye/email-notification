import { serializeError } from './error'

// Response
//
// { error: message, name: undefined, stack, .. }
// { ANY }
//
// errorResponse(error | string)
// okResponse(data | undefined)

export function okResponse(
	data: Record<string, unknown>,
	options: Record<string, unknown> = {},
) {
	return jsonResponse(data, options)
}

export function errorResponse(
	inputError: string | Error,
	inputOptions: Record<string, unknown> = {},
) {
	let result: Record<string, unknown>
	if (inputError instanceof Error) {
		const { message, ...rest } = serializeError(inputError)
		result = { error: message, ...rest }
	} else {
		result = { error: inputError }
	}
	const options = {
		status: inputError.httpStatus || 500,
		...inputOptions,
	}
	return jsonResponse(result, options)
}

export function jsonResponse(
	body: Record<string, unknown>,
	options: Record<string, unknown> = {},
) {
	return new Response(JSON.stringify(body), {
		...options,
		headers: {
			'Content-Type': 'application/json',
			...(options.headers as Record<string, string>),
		},
	})
}
