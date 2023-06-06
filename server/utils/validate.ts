import equals from 'validator/es/lib/equals'
import isAlphanumeric from 'validator/es/lib/isAlphanumeric'
import isEmail from 'validator/es/lib/isEmail'
import isEmpty from 'validator/es/lib/isEmpty'
import isLength from 'validator/es/lib/isLength'

/**
 * @param userData data provided by user through form
 * @returns `true` if validated successfully or `{ error }` with a message.
 */
export default function validateUserData(userData: Required<RegisterUser>): ValidationError | true {
  const { username, email, password, passwordRepeat } = userData

  const validateUsername = (): ValidationError | true => {
    if (isEmpty(username, { ignore_whitespace: true }))
      return { error: { message: 'Username cannot be empty' } }

    if (!isLength(username, { min: 3, max: 20 }))
      return {
        error: {
          message: 'Username\'s length must be between 3 and 20 characters.'
        }
      }

    if (!isAlphanumeric(username))
      return {
        error: {
          message: 'Username should contain only alphanumeric characters (a-Z),(0-9).'
        }
      }
    return true
  }

  const validateEmail = (): ValidationError | true => {
    if (isEmpty(email, { ignore_whitespace: true }))
      return { error: { message: 'Email cannot be empty.' } }
    if (!isEmail(email))
      return { error: { message: 'Email has invalid format.' } }
    return true
  }

  const validatePasswords = (): ValidationError | true => {
    if (isEmpty(password, { ignore_whitespace: true }) && isEmpty(passwordRepeat, { ignore_whitespace: true }))
      return { error: { message: '' } }

    if (!isLength(password, { min: 8 }))
      return {
        error: { message: 'Password should contain at least 8 characters.' }
      }
    if (!equals(password, passwordRepeat))
      return { error: { message: 'Passwords do not match.' } }
    return true
  }
  const validatedUsername = validateUsername()
  const validatedEmail = validateEmail()
  const validatedPasswords = validatePasswords()

  if (validatedUsername !== true)
    return validatedUsername
  if (validatedEmail !== true)
    return validatedEmail
  if (validatedPasswords !== true)
    return validatedPasswords

  return true
}
