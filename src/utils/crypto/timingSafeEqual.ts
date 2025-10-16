import crypto from 'node:crypto'

let hmacKey: Uint8Array | undefined

/**
 *  timingSafeEqual('a', 'b')
 */
export function timingSafeEqual(left: string, right: string): boolean {
  if (!hmacKey) {
    hmacKey = new Uint8Array(crypto.randomBytes(32))
  }
  const digA = sha256(left, hmacKey)
  const digB = sha256(right, hmacKey)
  return crypto.timingSafeEqual(digA, digB)
}

/**
 * timingSafeEqualSome(apiKeys, userInput)
 */
export function timingSafeEqualSome(keys: string[], input: string): boolean {
  return keys.some((key) => timingSafeEqual(key, input))
}

function sha256(input: string, key: Uint8Array): Uint8Array {
  return new Uint8Array(
    crypto.createHmac('sha256', key).update(input, 'utf8').digest(),
  )
}
