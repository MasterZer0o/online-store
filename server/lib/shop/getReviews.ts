import { and, asc, eq, gte, isNotNull, sql } from 'drizzle-orm'
import { reviews as reviewsSchema } from '~/server/db/schema/products'
import { users } from '~/server/db/schema/users'

export async function getReviews(productId: number, page: number, perPage: number) {
  const db = getDb()

  const whereConditions = [eq(reviewsSchema.productId, productId), isNotNull(reviewsSchema.comment)]

  if (page !== 1) {
    const offset = (page - 1) * perPage

    whereConditions.push(gte(reviewsSchema.id,
      sql`(SELECT MIN(id) + ${offset} FROM ${reviewsSchema} WHERE ${reviewsSchema.id} <= (SELECT MAX(${reviewsSchema.id}) FROM ${reviewsSchema}) AND ${reviewsSchema.productId} = ${productId})`))
  }
  const selectFields = {
    id: reviewsSchema.id,
    userId: reviewsSchema.userId,
    comment: reviewsSchema.comment,
    rating: reviewsSchema.rating,
    postedAt: reviewsSchema.createdAt,
    count: {}
  }

  if (page === 1) {
    selectFields.count = sql`(SELECT COUNT(*) FROM ${reviewsSchema} WHERE ${reviewsSchema.productId} = ${productId} AND ${reviewsSchema.comment} IS NOT NULL)`.as('count')
  }
  const reviewsSQ = db.select(selectFields)
    .from(reviewsSchema)
    .where(and(...whereConditions))
    .limit(perPage)
    .as('reviews')

  const result = db.select({
    username: users.name,
    comment: reviewsSQ.comment,
    rating: reviewsSQ.rating,
    postedAt: reviewsSQ.postedAt,
    id: reviewsSQ.id,
    count: reviewsSQ.count
  })
    .from(users)
    .leftJoin(reviewsSQ, eq(users.id, reviewsSQ.userId))
    .orderBy(asc(reviewsSchema.id))

  return result
}
