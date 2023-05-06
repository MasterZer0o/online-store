import isEmail from 'validator/es/lib/isEmail'
import isEmpty from 'validator/es/lib/isEmpty'
import isAlphanumeric from 'validator/es/lib/isAlphanumeric'
import equals from 'validator/es/lib/equals'
import isLength from 'validator/es/lib/isLength'
import isNumeric from 'validator/es/lib/isNumeric'

const errorMessages = {
  emptyField: 'This field cannot be empty.',
  badEmail: 'Email has invalid format.',
  notMatching: 'Passwords don\'t match.',
  badCharacters: 'Please use only letters and numbers.',
  usernameLength: 'Please keep your username between 3 and 20 characters (a-z) (0-9).',
  passwordLength: 'Your password should contain at least 8 characters.',
  onlyNumber: 'Username cannot be only number.',
  firstDigit: 'Username cannot start with a digit.'
} as const

/**
 * Utility function for setting error on form.
 * @param field form field `name`
 * @param type error type
 */
export function setValidationError(field: RegisterField, validationErrorType: keyof typeof errorMessages): void {
  const store = useRegisterStore()

  const registerErrors = store.registerErrors

  registerErrors[field].isError = true
  registerErrors[field].message = errorMessages[validationErrorType]
}
/**
 * Utility function for resetting errors on fields.
 * @param field form field name to reset
 */
export const resetFieldErrors = (field: RegisterField) => {
  const store = useRegisterStore()

  const errors = store.registerErrors
  errors[field].isError = false
  errors[field].message = ''
}

export const validateUsername = (username: string) => {
  if (isEmpty(username, { ignore_whitespace: true }))
    return setValidationError('username', 'emptyField')

  if (!isLength(username, { min: 3, max: 20 }))
    return setValidationError('username', 'usernameLength')

  if (!isAlphanumeric(username))
    return setValidationError('username', 'badCharacters')

  if (isNumeric(username))
    return setValidationError('username', 'onlyNumber')

  // check if first letter is number
  if (/^\d/.test(username))
    return setValidationError('username', 'firstDigit')

  resetFieldErrors('username')
}

export const validateEmail = (email: string) => {
  if (isEmpty(email, { ignore_whitespace: true }))
    return setValidationError('email', 'emptyField')

  if (!isEmail(email))
    return setValidationError('email', 'badEmail')

  resetFieldErrors('email')
}

export const validatePasswords = (password: string, passwordRepeat: string, event?: any) => {
  const isPasswordEmpty = isEmpty(password, { ignore_whitespace: true })
  const isPasswordRepeatEmpty = isEmpty(passwordRepeat, { ignore_whitespace: true })
  const arePasswordFieldsEmpty = isPasswordEmpty && isPasswordRepeatEmpty

  if (arePasswordFieldsEmpty) {
    setValidationError('password', 'emptyField')
    setValidationError('passwordRepeat', 'emptyField')
    return
  }

  if (!isLength(password, { min: 8 }))
    return setValidationError('password', 'passwordLength')

  if (!equals(password, passwordRepeat) && !isPasswordRepeatEmpty) {
    setValidationError('password', 'notMatching')
    setValidationError('passwordRepeat', 'notMatching')
    return
  }

  resetFieldErrors('password')
  resetFieldErrors('passwordRepeat')

  // if submit button is clicked after correcting errors on passwords, submit programmatically.
  if (event && event?.relatedTarget?.classList.contains('form-box__submit')) {
    const submitButton = document.querySelector('.form-box__submit') as HTMLButtonElement
    submitButton?.click()
  }
}
