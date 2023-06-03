import { eq } from 'drizzle-orm'
import { sessions, users } from '../db/drizzle/schema/users'
import { Session } from '../db/models/Session'

type SessionReturn =
  { sessionId: string }
  | { error: string }

export async function saveSession({ userId, role, id }: UserSessionInfo): Promise<SessionReturn> {
  try {
    const session: UserSession = {
      id,
      role,
      user_id: userId
    }

    await getDb().insert(sessions).values({
      id: session.id,
      userId
    })

    logSuccess(`Session created for userID: ${session.user_id}`)

    return { sessionId: session.id }
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
    if (sessionId)
      await Session.destroy({
        where: {
          id: sessionId
        }
      })

    await getDb().delete(sessions).where(eq(sessions.id, sessionId))
  }
  catch (error: any) {
    logError(error)
  }
}

export async function findUserSession(sessionId: string) {
  try {
    const [user] = await getDb().select({
      name: users.name
    })
      .from(sessions)
      .leftJoin(users, eq(sessions.userId, users.id))
      .where(eq(sessions.id, sessionId))
      .limit(1)

    if (!user)
      return user

    return {
      username: user.name
    }
  }
  catch (error) {
    return {
      error: 'Failed to find user session.'
    }
  }
}
