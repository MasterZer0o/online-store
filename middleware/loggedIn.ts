export default defineNuxtRouteMiddleware(() => {
  const store = useUser()

  if (store.user.isLoggedIn)
    return abortNavigation()
})
