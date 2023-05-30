import { userSession } from '~~/server/lib/userSession'

export default defineNuxtRouteMiddleware(async (to) => {
  const store = useUserStore()
  const event = useRequestEvent()

  // server side case when GET /user/account
  if (process.server) {
    const session = await userSession(event)

    if (session.data.user)
      return

    await session.update({ redirectURL: to.path })

    return navigateTo('/login')
  }

  // client side routing case
  if (process.client && !store.user.isLoggedIn) {
    store.redirectURL = to.path

    return navigateTo('/login')
  }
})
