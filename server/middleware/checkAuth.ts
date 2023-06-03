import { userSession } from '../lib/userSession'
import { findUserSession } from '../lib/session'
import { logError, logInfo } from '~~/server/lib/logger'

export default defineEventHandler(async (event) => {
  try {
    const session = await userSession(event)
    // logInfo('Ran checkAuth')
    // logInfo(event.context.sessions?.sess.data)

    if (session.data.user) {
      const user = await findUserSession(session.id!)

      // if (user !== null && !user.error) {
      //   await session.update({
      //     user: {
      //       username: user.username as string,
      //       role: user.role === 'admin' ? user.role : undefined
      //     }

      //   })
      // }
    }
  }
  catch (error: any) {
    logError(error)
  }
})
