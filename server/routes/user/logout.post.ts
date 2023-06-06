import { getSession, removeSession } from '~~/server/lib/session'

export default defineEventHandler(async (event) => {
  const session = await getSession(event)
  await Promise.all([removeSession(session.id), session.clear()])

  sendNoContent(event)
})
