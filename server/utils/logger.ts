import { logger } from '@nuxt/kit'

export function logInfo(messages: any, ...args: any) {
  const instance = logger.create({ formatOptions: { colors: true, compact: 15, columns: 4, depth: 5 } })
  instance.info(messages, ...args)
}
export function logSuccess(messages: any, ...args: any) {
  logger.success(messages, ...args)
}

export function logError(message: string | Error, ...args: any[]) {
  const instance = logger.create({ formatOptions: { colors: true, compact: false, } })

  instance.error(message, args.join(' '))
}
