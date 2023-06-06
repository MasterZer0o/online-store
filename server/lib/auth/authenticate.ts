import type { H3Event } from 'h3'
import { findUserSession, getSession } from '../../lib/session'

type User = {
  id: number
  username: string
} | { error: string }

export async function authenticate(event: H3Event): Promise<User> {
  try {
    const user = await findUserSession((await getSession(event)).id)

    if ('error' in user)
      return user

    return {
      id: user.id,
      username: user.username
    }
  }
  catch (error) {
    return { error: 'Error' }
  }
}
