import { and, eq } from 'drizzle-orm'
import { getSession } from '../../lib/session'
import { wishlist } from '../../db/schema/users'

export default defineEventHandler(async (event) => {
  try {
    const { productId } = await readBody<{ productId: number }>(event)

    const { data: { user } } = await getSession(event)

    const db = getDb()
    await db.delete(wishlist).where(
      and(eq(wishlist.userId, user!.id), eq(wishlist.productId, productId)))

    sendNoContent(event)
  }
  catch (error: any) {
    logError(error)
    // FIXME:
  }
})
