import { eq } from 'drizzle-orm'
import { users } from '../db/schema/users'
import { verifyPassword } from '../utils/hashPassword'

export default async function loginUser({ login, password }: UserLoginCredentials): Promise<UserLoginResponse> {
  try {
    const [user] = await getDb().select({
      password: users.password,
      id: users.id,
      role: users.role,
      username: users.name
    }).from(users).where(eq(users.email, login))

    if (!user)
      return null

    const hashedPassword = user.password
    const isPasswordCorrect: boolean = await verifyPassword(hashedPassword, password)

    if (!isPasswordCorrect)
      return null

    return {
      userId: user.id,
      role: user.role,
      username: user.username
    }
  }
  catch (error) {
    logError('Error while logging in user', error)
    return null
  }
}
