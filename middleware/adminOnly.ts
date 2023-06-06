export default defineNuxtRouteMiddleware((to, from) => {
  const event = useRequestEvent()

  if (process.server) {
    const { SESSION_COOKIE_NAME } = useRuntimeConfig()
    const { data: sessionData }: { data: Partial<ClientSessionData> } = event.context.sessions![SESSION_COOKIE_NAME]

    if (!sessionData.user?.role)
      return createError({ message: 'Page not found', statusCode: 404 })
  }
  // if not navigated through URL bar
  if (to.path !== from.path && process.client && !useUser().user.role)
    setPageLayout('404')
    // return showError({ message: 'Page not found', statusCode: 404 })
})
