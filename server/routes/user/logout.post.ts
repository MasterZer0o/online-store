import { removeSession } from '~~/server/lib/session'
import { userSession } from '~~/server/lib/userSession'

export default defineEventHandler(async (event) => {
  const session = await userSession(event)
  await removeSession(session.id!)
  await session.clear()

  sendNoContent(event)
})
