import type { H3Event } from 'h3'
import { useSession } from 'h3'

export async function userSession(event: H3Event, rememberMe = true) {
  const COOKIE_MAXAGE = 2_592_000 // 30 days

  const { SESSION_COOKIE_NAME, SESSION_PASSWORD } = useRuntimeConfig()

  const session = await useSession<ClientSessionData>(event, {
    password: SESSION_PASSWORD,
    name: SESSION_COOKIE_NAME,
    maxAge: rememberMe ? COOKIE_MAXAGE : undefined,
    cookie: { sameSite: true, httpOnly: true }
  })

  return session as typeof session & { data: ClientSessionData }
}
