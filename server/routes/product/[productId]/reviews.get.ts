import { and, eq, isNotNull } from 'drizzle-orm'
import { reviews as reviewsSchema } from '../../../db/schema/products'

export default defineEventHandler(async (event) => {
  const db = getDb()

  const productId = Number(getRouterParams(event).productId)

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await db.select({
    comment: reviewsSchema.comment,
    rating: reviewsSchema.rating,
  })
    .from(reviewsSchema)
    .where(and(eq(reviewsSchema.productId, productId), isNotNull(reviewsSchema.comment)))

  await new Promise(resolve => setTimeout(resolve, 1500))
  return reviews
})
