import { eq } from 'drizzle-orm'

import type { H3Event } from 'h3'
import { useSession } from 'h3'
import { sessions, users } from '../db/schema/users'

type SessionReturn =
  { sessionId: string }
  | { error: string }

export async function saveSession({ userId, id }: UserSessionInfo): Promise<SessionReturn> {
  try {
    await getDb().insert(sessions).values({
      id,
      userId
    })

    logSuccess(`Session created for userID: ${userId}`)

    return { sessionId: id }
  }
  catch (error: any) {
    logError(error)

    return {
      error: error.message || 'Error while creating saving session'
    }
  }
}

export async function removeSession(sessionId: string) {
  try {
    await getDb().delete(sessions).where(eq(sessions.id, sessionId))
  }
  catch (error: any) {
    logError(error)
  }
}

type User = {
  id: number
  username: string
} | {
  error: string
}

export async function findUserSession(sessionId: string): Promise<User> {
  try {
    const [user] = await getDb().select({
      name: users.name,
      id: users.id
    })
      .from(sessions)
      .leftJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.id, sessionId))
      .limit(1) as ({ name: string; id: number } | undefined)[]

    if (!user)
      return {
        error: 'User not found.'
      }

    return {
      username: user.name,
      id: user.id
    }
  }
  catch (error) {
    return {
      error: 'Failed to find user session.'
    }
  }
}

export async function getSession(event: H3Event, rememberMe = true) {
  const COOKIE_MAXAGE_REMEMBER = 2_592_000 // 30 days

  const { SESSION_COOKIE_NAME, SESSION_PASSWORD } = useRuntimeConfig()

  const session = await useSession<ClientSessionData>(event, {
    password: SESSION_PASSWORD,
    name: SESSION_COOKIE_NAME,
    maxAge: rememberMe ? COOKIE_MAXAGE_REMEMBER : undefined,
    cookie: { sameSite: true, httpOnly: true }
  })

  return session as typeof session & { id: Readonly<string> } & { data: ClientSessionData }
}
