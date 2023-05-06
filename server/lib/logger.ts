import { logger } from '@nuxt/kit'

export function logInfo(messages: any, ...args: any) {
  logger.info(messages, ...args)
}
export function logSuccess(messages: any, ...args: any) {
  logger.success(messages, ...args)
}

export function logError(message: string | Error | unknown, ...args: any[]) {
  logger.error(message, args.join(' '))
}
