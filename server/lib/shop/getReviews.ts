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
  count?: Record<'r1' | 'r2' | 'r3' | 'r4' | 'r5', number>
})[]
// type FnReturn<WithCount = false> = (WithCount extends true ? ReviewData['data'][number] & {
//   count: Record<'r1' | 'r2' | 'r3' | 'r4' | 'r5', number>
// } : ReviewData['data'][number])[]

export async function getReviews({ productId, page, perPage, cid, rating }: FnParams): Promise<FnReturn> {
  const db = getDb()

  const whereConditions = [eq(reviewsSchema.productId, productId), isNotNull(reviewsSchema.comment)]

  const selectFields = {
    id: reviewsSchema.id,
    userId: reviewsSchema.userId,
    comment: reviewsSchema.comment,
    rating: reviewsSchema.rating,
    postedAt: reviewsSchema.createdAt,
    count: {}
  }

  if (rating)
    whereConditions.push(eq(reviewsSchema.rating, +rating))

  if (cid) {
    whereConditions.push(gt(reviewsSchema.id, Number.parseInt(cid)))
  }

  if (page !== 1) {
    const offset = (page - 1) * perPage

    if (cid) {
      whereConditions.push(gt(reviewsSchema.id, Number.parseInt(cid)))
    }
    else {
      whereConditions.push(gte(reviewsSchema.id,
        sql`(SELECT MIN(id) + ${offset} FROM ${reviewsSchema} WHERE ${reviewsSchema.id} <= (SELECT MAX(${reviewsSchema.id}) FROM ${reviewsSchema}) AND ${reviewsSchema.productId} = ${productId})`))
    }
  }

  // if (page === 1) {
  //   selectFields.count = rating
  //     ? sql`(SELECT COUNT(*) FROM ${reviewsSchema} WHERE ${reviewsSchema.productId} = ${productId} AND ${reviewsSchema.comment} IS NOT NULL AND ${reviewsSchema.rating}=${rating})`.as('count')

  //     : sql`(SELECT COUNT(*) FROM ${reviewsSchema} WHERE ${reviewsSchema.productId} = ${productId} AND ${reviewsSchema.comment} IS NOT NULL)`.as('count')
  // }
  const isInitialRequest = page === 1 && !rating
  if (isInitialRequest) {
    selectFields.count = sql`
    (SELECT json_build_object(
        'r1', SUM(CASE WHEN ${reviewsSchema.rating} = 1 THEN 1 ELSE 0 END),
        'r2', SUM(CASE WHEN ${reviewsSchema.rating} = 2 THEN 1 ELSE 0 END),
        'r3', SUM(CASE WHEN ${reviewsSchema.rating} = 3 THEN 1 ELSE 0 END),
        'r4', SUM(CASE WHEN ${reviewsSchema.rating} = 4 THEN 1 ELSE 0 END),
        'r5', SUM(CASE WHEN ${reviewsSchema.rating} = 5 THEN 1 ELSE 0 END))
  FROM ${reviewsSchema})`.as('count')
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
    .where(eq(users.id, reviewsSQ.userId))
    .orderBy(asc(reviewsSchema.id))

  return result as any
}
