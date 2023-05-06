import { User } from '../db/models/User'
import { hashPassword } from '../utils/hashPassword'
import { logSuccess } from '~~/server/lib/logger'
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

    await User.create({
      username,
      email,
      password: hashedPassword
    }, { returning: false })

    logSuccess(`User '${userData.username}' saved.`)
  }
  catch (error) {
    // eslint-disable-next-line no-throw-literal
    throw {
      error: 'Failed to save user to database.',
      type: 'critical',
      details: error
    }
  }
}

export async function checkAvailability(userData: RegisterUser) {
  const emailExists = await User.findOne({
    where: {
      email: userData.email
    },
    attributes: ['email']
  })
  if (emailExists) {
    return {
      error: true,
      message: 'Email is in use'
    }
  }
  return { error: false }
}
