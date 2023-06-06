import { getSession } from '~~/server/lib/session'

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useUser()

  // server side case when GET /user/account
  if (process.server) {
    const event = useRequestEvent()
    const session = await getSession(event)

    if (session.data.user)
      return

    await session.update({ redirectURL: to.fullPath })

    return navigateTo('/login')
  }

  // client side routing case
  if (process.client && !store.user.isLoggedIn) {
    store.redirectURL = to.fullPath

    return navigateTo('/login')
  }
})
