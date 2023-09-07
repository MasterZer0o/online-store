import { and, asc, eq, gte, isNotNull, sql } from 'drizzle-orm'
import { reviews as reviewsSchema } from '~/server/db/schema/products'
import { users } from '~/server/db/schema/users'

export async function getReviews(productId: number, page: number) {
  const db = getDb()
  const MAX_REVIEWS_PER_PAGE = 20

  const whereConditions = [eq(reviewsSchema.productId, productId), isNotNull(reviewsSchema.comment)]

  if (page !== 1) {
    const offset = (page - 1) * MAX_REVIEWS_PER_PAGE

    whereConditions.push(gte(reviewsSchema.id,
      sql`(SELECT MIN(id) + ${offset} FROM ${reviewsSchema} WHERE ${reviewsSchema.id} <= (SELECT MAX(${reviewsSchema.id}) FROM ${reviewsSchema}) AND ${reviewsSchema.productId} = ${productId})`))
  }

  const reviewsSQ = db.select({
    id: reviewsSchema.id,
    userId: reviewsSchema.userId,
    comment: reviewsSchema.comment,
    rating: reviewsSchema.rating,
    postedAt: reviewsSchema.createdAt
  })
    .from(reviewsSchema)
    .where(and(...whereConditions))
    .limit(MAX_REVIEWS_PER_PAGE)
    .as('reviews')

  const result = db.select({
    username: users.name,
    comment: reviewsSQ.comment,
    rating: reviewsSQ.rating,
    postedAt: reviewsSQ.postedAt,
    id: reviewsSQ.id
  })
    .from(users)
    .leftJoin(reviewsSQ, eq(users.id, reviewsSQ.userId))
    .orderBy(asc(reviewsSchema.id))

  return result
}
