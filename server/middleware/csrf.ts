import { createCipheriv, createDecipheriv, randomBytes, randomUUID } from 'node:crypto'
import { Buffer } from 'node:buffer'
import { getHeader, setResponseStatus } from 'h3'
import { userSession } from '../lib/userSession'
import { logError } from '~~/server/lib/logger'

const config = useRuntimeConfig().csrf

const key = Buffer.from(randomBytes(22).toString('base64'))

export function generateCSRFToken(secret: string) {
  const iv = randomBytes(16)

  const cipher = createCipheriv(config.algorithm, key, iv)
  const encrypted = cipher.update(secret, 'utf-8', 'base64') + cipher.final('base64')

  return `${iv.toString('base64')}:${encrypted}`
}

export function verifyCSRF(secret: string, token: string) {
  const [iv, encrypted] = token.split(':')

  if (!iv || !encrypted)
    return false

  try {
    const decipher = createDecipheriv(config.algorithm, key, Buffer.from(iv, 'base64'))

    const decrypted = decipher.update(encrypted, 'base64', 'utf-8') + decipher.final('utf-8')

    return decrypted === secret
  }
  catch (error: any) {
    logError(error)
    return false
  }
}

export default defineEventHandler(async (event) => {
  const session = await userSession(event)
  const secret = session.data.csrf

  if (!secret)
    await session.update({ csrf: randomUUID() })

  Object.defineProperty(event.node.res, 'csrftoken', {
    value: generateCSRFToken(session.data.csrf),
    enumerable: true
  })

  if (['/user/login', '/user/register'].includes(event.node.req.url as string)) {
    const token = getHeader(event, config.headerName) ?? ''

    if (!verifyCSRF(secret, token)) {
      setResponseStatus(event, 403, 'CSRF Token Mismatch')
      return {
        error: 'CSRF Token Mismatch'
      }
    }
  }
})
