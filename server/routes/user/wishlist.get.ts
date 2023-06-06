import { getSession } from '../../lib/session'
import { getWishlist, getWishlistIds } from '~/server/lib/shop/getWishlist'

export default defineEventHandler(async (event) => {
  try {
    const { get: fetchOnly } = getQuery(event) as Partial<{ get: 'id' }>

    const user = await getSession(event)

    if (fetchOnly === 'id')
      return await getWishlistIds(user.data.user!.id)

    const wishlist = await getWishlist(user.data.user!.id)

    return wishlist
  }
  catch (error) {
    return {
      error: 'Failed to get wishlist.'
    }
  }
})
