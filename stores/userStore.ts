export const useUser = defineStore('user', () => {
  const user = reactive<{ isLoggedIn: boolean; username?: string;role?: string }>({ isLoggedIn: false })

  const redirectURL = ref<string | null>(null)

  const loginCallback = ref<{ fn: (...args: any) => void; args: any[] } | undefined>()

  function logout() {
    user.isLoggedIn = false
    delete user.role
    delete user.username
  }

  return { user, logout, redirectURL, loginCallback }
})
