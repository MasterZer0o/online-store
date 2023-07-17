import saveUser, { checkAvailability } from '~~/server/lib/saveUser'
import validateUser from '~~/server/utils/validate'

function normalizedMessage(field: RegisterField): string {
  const messageChunk = 'was not provided.'
  const normalizedField = field === 'passwordRepeat' ? 'Repeated password' : `${field.charAt(0).toUpperCase()}${field.slice(1)}`
  return `${normalizedField} ${messageChunk}`
}

export default defineEventHandler(async (event) => {
  try {
    const { username = null, email = null, password = null, passwordRepeat = null } = await readBody(event)
    const userData: RegisterUser = { username, email, password, passwordRepeat }
    const allFieldsProvided: boolean = Object.values(userData).every(value => value !== null)

    if (!allFieldsProvided) {
      const notProvidedFields = Object.keys(userData).filter(key => userData[key as keyof RegisterUser] === null) as RegisterField[]
      return {
        error: {
          message: normalizedMessage(notProvidedFields[0])
        }
      }
    }

    const validated = validateUser(userData)

    if (validated !== true)
      return validated

    const canRegister = await checkAvailability(userData)

    if (!canRegister.error) {
      await saveUser(userData)
      sendNoContent(event, 201)
      return
    }
    return {
      error: {
        message: canRegister.message as string
      }
    }
  }
  catch (error: any) {
    logError(error)
  }
})
