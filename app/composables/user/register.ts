export async function requestRegister(data: RegisterUser) {
  const store = useRegisterStore()
  if (store.registerData.email === store.lastEmailValue) {
    store.registerErrorResponse = store.registerErrorText
    addListener()
    return
  }
  const { csrf } = useCsrf()

  try {
    const response = await $fetch('/user/register', {
      method: 'POST',
      body: data,
      headers: {
        'X-CSRF': csrf
      }
    })

    store.lastEmailValue = data.email

    if (response.error) {
      store.registerErrorResponse = true
      store.registerErrorText = response.error.message
      addListener()
      return
    }

    return await navigateTo('/', { replace: true })
  }
  catch (error) {
    store.registerErrorResponse = 'Error occurred. Try again.'
    store.registerErrorText = 'Error occurred. Try again.'
    addListener()
  }
  function addListener() {
    store.emailFieldElement?.addEventListener('input', () => store.registerErrorResponse = null, { once: true })
  }
}
