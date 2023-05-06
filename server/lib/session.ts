import { Session } from '../db/models/Session'
import { User } from '../db/models/User'
import { logError, logSuccess } from '~~/server/lib/logger'

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

    await Session.create(session, { returning: false })
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
  }
  catch (error) {
    logError(error)
  }
}

export async function findUserSession(sessionId: string) {
  try {
    const user = await Session.findByPk(sessionId, {
      attributes: ['user_id', 'id', 'role'],
      include: [{ model: User, attributes: ['username'], required: true }],
      logging: false
    }) as UserSessionModel & {
        dataValues: {
          User: {
            dataValues: { username: string }
          }
      }
    } | null

    if (!user)
      return user

    return {
      username: user.dataValues.User.dataValues.username,
      role: user.dataValues.role
    }
  }
  catch (error) {
    return {
      error: 'Failed to find user session.'
    }
  }
}
