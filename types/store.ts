export {}
declare global {
  export interface ProductsResponse {
    meta: {
      cid: string
    }
    items: Product[]
    category: {
      name: string
      slug: string
      productCount: number
      totalPages: number
    }
  }
}
