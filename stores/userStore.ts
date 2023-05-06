export const useUserStore = defineStore('user', () => {
  const user = reactive<{ isLoggedIn: boolean; username?: string;role?: string }>({ isLoggedIn: false })

  const redirectURL = ref<string | null>(null)

  function logout() {
    user.isLoggedIn = false
    delete user.role
    delete user.username
  }

  return { user, logout, redirectURL }
})
