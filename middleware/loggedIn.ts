export default defineNuxtRouteMiddleware(() => {
  const store = useUserStore()

  if (store.user.isLoggedIn)
    return abortNavigation()
})
