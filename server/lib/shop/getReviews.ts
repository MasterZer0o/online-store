import { and, asc, eq, gt, gte, isNotNull, sql } from 'drizzle-orm'
import { reviews as reviewsSchema } from '~/server/db/schema/products'
import { users } from '~/server/db/schema/users'

interface FnParams {
  productId: number
  page: number
  perPage: number
  rating?: string
  cid?: string
}
type FnReturn = (ReviewData['data'][number] & {
  counts?: RatingCounts
})[]

export async function getReviews({ productId, page, perPage, cid, rating }: FnParams): Promise<FnReturn> {
  const db = getDb()

  const whereConditions = [eq(reviewsSchema.productId, productId), isNotNull(reviewsSchema.comment)]

  const selectFields = {
    id: reviewsSchema.id,
    userId: reviewsSchema.userId,
    comment: reviewsSchema.comment,
    rating: reviewsSchema.rating,
    postedAt: reviewsSchema.createdAt,
    counts: {}
  }

  if (rating)
    whereConditions.push(eq(reviewsSchema.rating, +rating))

  if (cid) {
    whereConditions.push(gt(reviewsSchema.id, Number.parseInt(cid)))
  }

  if (page !== 1) {
    const offset = (page - 1) * perPage

    whereConditions.push(gte(reviewsSchema.id,
      sql`(SELECT MIN(id + ${offset}) FROM ${reviewsSchema} WHERE ${reviewsSchema.id} <= (SELECT MAX(${reviewsSchema.id}) FROM ${reviewsSchema}) AND ${reviewsSchema.productId} = ${productId})`))
  }

  const isInitialRequest = page === 1 && !rating

  if (isInitialRequest) {
    selectFields.counts = sql`
    (SELECT json_build_object(
        'r1', SUM(CASE WHEN ${reviewsSchema.rating} = 1 THEN 1 ELSE 0 END),
        'r2', SUM(CASE WHEN ${reviewsSchema.rating} = 2 THEN 1 ELSE 0 END),
        'r3', SUM(CASE WHEN ${reviewsSchema.rating} = 3 THEN 1 ELSE 0 END),
        'r4', SUM(CASE WHEN ${reviewsSchema.rating} = 4 THEN 1 ELSE 0 END),
        'r5', SUM(CASE WHEN ${reviewsSchema.rating} = 5 THEN 1 ELSE 0 END))
  FROM ${reviewsSchema})`.as('counts')
  }

  const usersSQ = db.select({
    username: users.name,
    id: users.id
  }).from(users)
    .as('users')

  const result = await db.select({
    ...selectFields,
    username: usersSQ.username,
  }).from(reviewsSchema)
    .where(and(...whereConditions))
    .leftJoin(usersSQ, eq(usersSQ.id, reviewsSchema.userId))
    .orderBy(asc(reviewsSchema.id))
    .limit(perPage)

  return result as any
}
