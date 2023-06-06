import { getSession, saveSession } from '~~/server/lib/session'
import loginUser from '~~/server/services/loginUser'
import { logError } from '~~/server/lib/logger'

export default defineEventHandler(async (event): Promise<LoginResponse> => {
  try {
    const { login, password, remember = false } = await readBody<UserLoginCredentials>(event)
    const user: UserLoginResponse = await loginUser({ login, password })

    if (user === null)
      return { error: true, status: 'Login or password is incorrect.' }

    const session = await getSession(event, remember)
    await saveSession({ userId: user.userId, role: user.role, id: session.id! }) // save new authenticated session to db

    await session.update({
      user: {
        username: user.username,
        role: user.role === 'admin' ? user.role : undefined,
        remember,
        id: user.userId
      }
    })

    const response: LoginResponse = {
      status: 'success',
      username: user.username
    }

    if (user.role === 'admin')
      response.role = user.role

    return response
  }
  catch (error: unknown) {
    logError('Error in login handler:', error)

    return {
      error: true,
      status: 'Something went wrong'
    }
  }
})
