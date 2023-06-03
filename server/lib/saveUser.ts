import { eq } from 'drizzle-orm'
import { users } from '../db/drizzle/schema/users'
import { hashPassword } from '../utils/hashPassword'

/**
 * This function saves user to database if validated successfully.
 * @param userData data provided by user through form
 */
export default async function saveUser(userData: RegisterUser) {
  const { username, email, password } = userData

  try {
    const hashedPassword = await hashPassword(password)

    if (typeof hashedPassword !== 'string')
      throw hashedPassword

    await getDb().insert(users).values({
      email,
      password: hashedPassword,
      name: username,
      lastname: 'random'
    })

    logSuccess(`User '${userData.username}' saved.`)
  }
  catch (error) {
    /* eslint-disable-next-line no-throw-literal */
    throw {
      error: 'Failed to save user to database.',
      type: 'critical',
      details: error
    }
  }
}

export async function checkAvailability(userData: RegisterUser) {
  try {
    const emailExists = await getDb().query.users.findFirst({ where: eq(users.email, userData.email) })

    if (emailExists) {
      return {
        error: true,
        message: 'Email is in use'
      }
    }
    return { error: false }
  }
  catch (error) {
    return {
      error: true,
      message: 'Internal error'
    }
  }
}
