/**
 * Function validating all user input fields for signing up.
 * @param userData data provided by user through form
 * @returns `true` if validated successfully, `false` otherwise.
 */
export function validateUserData(userData: Required<RegisterUser>): boolean {
  const store = useRegisterStore()
  const { username, email, password, passwordRepeat } = userData

  validateUsername(username)

  validateEmail(email)

  validatePasswords(password, passwordRepeat)

  const isAnyError = !Object.values(store.registerErrors).some(obj => obj.isError === true)

  return isAnyError
}
