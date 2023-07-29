import { eq } from 'drizzle-orm'
import { discounts, products } from '../../db/schema/products'
import { prepareProducts } from './getProducts'
import { wishlist } from '~/server/db/schema/users'

export async function getWishlist(userId: number) {
  try {
    const wishlistProducts = await getDb().select({
      id: products.id,
      name: products.name,
      price: products.price,
      image: products.image,
      discountValue: discounts.value,
      discountType: discounts.type,
    })
      .from(wishlist)
      .innerJoin(products, eq(products.id, wishlist.productId))
      .leftJoin(discounts, eq(discounts.productId, products.id))
      .where(eq(wishlist.userId, userId))

    return prepareProducts(wishlistProducts)
  }
  catch (error) {
    // todo
  }
}

export async function getWishlistIds(userId: number) {
  try {
    const productIds = await getDb().select({
      id: products.id
    })
      .from(wishlist)
      .innerJoin(products, eq(products.id, wishlist.productId))
      .where(eq(wishlist.userId, userId))

    return productIds.map(({ id }) => id)
  }
  catch (error) {

  }
}
