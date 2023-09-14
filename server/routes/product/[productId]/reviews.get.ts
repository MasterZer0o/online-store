import { getReviews } from '~/server/lib/shop/getReviews'

interface IncomingQueryParams {
  page: string
  cid: string
  r?: string
}

export default defineEventHandler(async (event): Promise<ReviewData> => {
  const productId = Number(getRouterParams(event).productId)
  const { page: requestedPage, cid, r: rating }: IncomingQueryParams = getQuery<IncomingQueryParams>(event)

  const MAX_REVIEWS_PER_PAGE = 20
  let page = Number.parseInt(requestedPage)
  page = Number.isNaN(page) ? 1 : page

  if (Number.isNaN(productId))
    throw createError({ statusCode: 404 })

  const reviews = await getReviews({ productId, page, perPage: MAX_REVIEWS_PER_PAGE, cid, rating })

  const response: ReviewData & { count: any } = {
    cid: reviews.at(-1)?.id ?? undefined,
    count: reviews.length !== 0 ? reviews.at(-1)?.count : undefined,
    data: reviews.reduce<ReviewData['data']>((acc, val) => {
      delete val.count

      acc.push(val)
      return acc
    }, [])
  }

  page === 1 && (response.perPage = MAX_REVIEWS_PER_PAGE)

  await wait(500)

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
  cid?: number
  perPage?: number
}
interface ReviewDataWithCount extends ReviewDataBase {
  count: NonNullable<Awaited<ReturnType<typeof getReviews>>[number]['count']>
}

declare global {
  type ReviewData<WithCount = false> = WithCount extends true ? ReviewDataWithCount : ReviewDataBase
}
