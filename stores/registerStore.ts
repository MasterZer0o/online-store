import isEmpty from 'validator/es/lib/isEmpty'

export const useRegisterStore = defineStore('register', () => {
  const registerData = ref<RegisterUser>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  })

  const isPasswordRevealed = ref<boolean>(false)

  const registerErrors = ref<RegisterError>({
    username: {
      isError: false,
      message: ''
    },
    email: {
      isError: false,
      message: ''
    },
    password: {
      isError: false,
      message: ''
    },
    passwordRepeat: {
      isError: false,
      message: ''
    }
  })

  const registerErrorResponse = ref<string | null | true>(null)
  const registerErrorText = ref<string>('')
  const emailFieldElement = ref<HTMLInputElement>()
  const lastEmailValue = ref<string>('')

  const canRegister = computed(() => {
    const isAnyError = Object.values(registerErrors.value).some(({ isError }) => isError === true)
    const isAnyFieldEmpty = Object.values(registerData.value).some(fieldValue =>
      isEmpty(fieldValue, { ignore_whitespace: true })
    )
    return !(isAnyError || isAnyFieldEmpty) && registerData.value.password === registerData.value.passwordRepeat
      && !registerErrorResponse.value
  })

  return { isPasswordRevealed, registerData, canRegister, registerErrors, registerErrorResponse, emailFieldElement, lastEmailValue, registerErrorText }
})
