export {}
declare global {
  export interface ProductsResponse {
    meta: {
      cid: string
    }
    items: Product[]
    category: {
      name: string | undefined
      slug: string
      productCount: number
      totalPages: number
    }
  }
}
