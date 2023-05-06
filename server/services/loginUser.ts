import { User } from '../db/models/User'
import { verifyPassword } from '../utils/hashPassword'
import { logError } from '~~/server/lib/logger'

export default async function loginUser({ login, password }: UserLoginCredentials): Promise<UserLoginResponse> {
  try {
    const user = (await User.findOne({
      where: {
        username: login
      },
      attributes: ['password', 'id', 'role', 'username'],
      raw: true
    })) as null | User

    if (user === null)
      return null

    const hashedPassword: string = user.password
    const isPasswordCorrect: boolean = await verifyPassword(hashedPassword, password)

    if (!isPasswordCorrect)
      return null

    return { userId: user.id, role: user.role, username: user.username }
  }
  catch (error) {
    logError('error', 'Error while logging in user', error)
    return null
  }
}
