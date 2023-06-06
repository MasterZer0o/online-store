import { getSession } from '../../lib/session'
import { wishlist } from '../../db/schema/users'

export default defineEventHandler(async (event) => {
  try {
    const { productId } = await readBody<{ productId: number }>(event)

    const { data: { user } } = await getSession(event)

    const db = getDb()
    await db.insert(wishlist).values({ productId, userId: user!.id }).onConflictDoNothing()

    sendNoContent(event, 201)
  }
  catch (error) {
    // error handle
  }
})
