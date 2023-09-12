import { getReviews } from '~/server/lib/shop/getReviews'

export default defineEventHandler(async (event): Promise<ReviewData> => {
  const productId = Number(getRouterParams(event).productId)
  let { page, cid }: { page: string | number;cid: string } = getQuery<{ page: string;cid: string }>(event)

  const MAX_REVIEWS_PER_PAGE = 20

  page = Number.parseInt(page)
  page = Number.isNaN(page) ? 1 : page

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await getReviews({ productId, page, perPage: MAX_REVIEWS_PER_PAGE, cid }) as (ReviewData['data'][number] & { id?: number })[]

  const response: ReviewData = {
    cid: reviews.at(-1)?.id ?? undefined,
    data: reviews.reduce<ReviewData['data']>((acc, val) => {
      acc.push(val)
      return acc
    }, [])
  }

  page === 1 && (response.perPage = MAX_REVIEWS_PER_PAGE)

  await wait(500)

  return response
})

declare global {
  interface ReviewData {
    data: {
      username: string
      comment: string
      rating: number
      postedAt: Date
      /**
       * Review id.
       */
      id: number
    }[]
    /**
     * Last review `id` of the current page for pagination.
     */
    cid?: number
    perPage?: number

  }
}
