import { useUser } from '~~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUser()

  if (!store.user.isLoggedIn) {
    //
  }

  // console.log(store.user.isLoggedIn)
})
