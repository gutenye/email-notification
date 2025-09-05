import type { Message } from '../types'
import { komodo } from './komodo'

export const templates: TemplateFunction = {
  komodo,
}

type TemplateFunction = (payload: any, params: any) => Message
