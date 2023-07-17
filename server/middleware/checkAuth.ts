import { findUserSession, getSession } from '../lib/session'

export default defineEventHandler(async (event) => {
  try {
    const session = await getSession(event)
    // logInfo(session.data)

    // if (session.data.user) {
    //   const user = await findUserSession(session.id!)
    //   if (user && !('error' in user))
    //     event.context.user = user
    // }
  }
  catch (error: any) {
    logError(error)
  }
})
