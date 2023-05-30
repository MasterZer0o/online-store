import { useUserStore } from '~~/stores/userStore'

export default defineNuxtRouteMiddleware((to, from) => {
  const store = useUserStore()

  if (!store.user.isLoggedIn) {
    //
  }

  // console.log(store.user.isLoggedIn)
})
