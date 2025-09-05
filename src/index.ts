import { buildDebugMessage } from './buildDebugMessage'
import { buildMessage } from './buildMessage'
import { buildTemplateMessage } from './buildTemplateMessage'
import { sendEmail } from './sendEmail'
import type { Message } from './types'

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const keys = env.API_KEYS.split('\n').map((line: string) =>
      line.split(':')[1].trim(),
    )
    const url = new URL(request.url)
    const pathname = url.pathname.slice(1)
    const params = Object.fromEntries(url.searchParams)

    if (!keys.includes(pathname)) {
      return new Response('Not found', { status: 404 })
    }

    let message: Message
    const isDebug = 'debug' in params
    if (isDebug) {
      message = await buildDebugMessage(request, params)
    } else if (params.template) {
      message = await buildTemplateMessage(request, params)
    } else {
      message = await buildMessage(request, params)
    }

    print(message)

    try {
      await sendEmail({ env, message })
    } catch (error) {
      if (error instanceof Error) {
        return new Response(error.message)
      }
      return new Response('An unknown error occurred')
    }

    return new Response('Success')
  },
} satisfies ExportedHandler<Env>
