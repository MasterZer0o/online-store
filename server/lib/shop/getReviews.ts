import { and, eq, isNotNull } from 'drizzle-orm'
import { reviews as reviewsSchema } from '~/server/db/schema/products'
import { users } from '~/server/db/schema/users'

export async function getReviews(productId: number) {
  const db = getDb()

  const reviewsSQ = db.select({
    userId: reviewsSchema.userId,
    comment: reviewsSchema.comment,
    rating: reviewsSchema.rating,
    postedAt: reviewsSchema.createdAt
  })
    .from(reviewsSchema)
    .where(and(eq(reviewsSchema.productId, productId), isNotNull(reviewsSchema.comment)))
    .limit(20)
    .as('reviews')

  const result = db.select({
    username: users.name,
    comment: reviewsSQ.comment,
    rating: reviewsSQ.rating,
    postedAt: reviewsSQ.postedAt
  })
    .from(users)
    .leftJoin(reviewsSQ, eq(users.id, reviewsSQ.userId))

  return result
}
