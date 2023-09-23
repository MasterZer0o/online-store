import { getReviews } from '~/server/lib/shop/getReviews'

interface IncomingQueryParams {
  p: string // page
  cid: string
  r?: string // rating
}

export default defineEventHandler(async (event): Promise<ReviewData> => {
  const productId = Number(getRouterParams(event).productId)
  const { p: requestedPage, cid, r: rating }: IncomingQueryParams = getQuery<IncomingQueryParams>(event)

  const MAX_REVIEWS_PER_PAGE = useRuntimeConfig().REVIEWS_PER_PAGE
  let page = Number.parseInt(requestedPage)
  page = Number.isNaN(page) ? 1 : page

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await getReviews({ productId, page, perPage: MAX_REVIEWS_PER_PAGE, cid, rating })

  const response: ReviewData | ReviewData<true> = {
    cid: reviews.at(-1)!.id,
    counts: reviews.at(-1)?.counts,
    perPage: page === 1 ? MAX_REVIEWS_PER_PAGE : undefined,
    data: reviews.reduce<ReviewData['data']>((acc, val) => {
      delete val.counts

      acc.push(val)
      return acc
    }, [])
  }

  await wait(1000)

  return response
})

interface ReviewDataBase {
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
  cid: number
  perPage?: number
}

type InitialReviewsRequest = ReviewDataBase & {
  counts: NonNullable<Awaited<ReturnType<typeof getReviews>>[number]['counts']>
}

declare global {
  type ReviewData<IsInitialRequest = false> = IsInitialRequest extends true ? InitialReviewsRequest : ReviewDataBase
}
