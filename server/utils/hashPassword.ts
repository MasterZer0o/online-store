import argon2 from 'argon2'
import { logError } from '~~/server/lib/logger'

/**
 *
 * @param password password to hash
 * @returns hashed password
 */
export async function hashPassword(password: string): Promise<string | HashError> {
  try {
    return await argon2.hash(password, { type: argon2.argon2i, timeCost: 2 })
  }
  catch (error) {
    logError('Failed to hash password', error)
    return {
      error: 'Failed to hash password.'

    }
  }
}

export async function verifyPassword(hash: string, password: string) {
  try {
    return await argon2.verify(hash, password, { timeCost: 2, type: argon2.argon2i })
  }
  catch (error: any) {
    logError(error)
    return false
  }
}
