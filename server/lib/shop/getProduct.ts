import { eq, sql } from 'drizzle-orm'
import { discounts, images, products, reviews } from '../../db/schema/products'
import { wishlist } from '../../db/schema/users'

export async function getProduct(productId: string | number): Promise<ProductDetails | {
    error: {
  message: 'Product not found'
  statusCode: 404
} }> {
  const db = getDb()

  productId = Number.parseInt(productId as string)

  if (Number.isNaN(productId)) {
    return {
      error: {
        message: 'Product not found',
        statusCode: 404
      }
    }
  }

  const [_product] = await db.select({
    id: products.id,
    name: products.name,
    description: products.description,
    price: products.price,
    image: products.image,
    discountValue: discounts.value,
    discountType: discounts.type,
    desiredCount: sql<string>`(SELECT COUNT(*) FROM ${wishlist} WHERE ${wishlist.productId} = ${productId})`,
    images: sql<string[]>`array(SELECT ${images.url} from ${images} WHERE ${images.productId} = ${productId})`,
    reviewCount: sql<number>`(SELECT COUNT(*) FROM ${reviews} WHERE ${reviews.comment} IS NOT NULL AND ${reviews.productId} = ${productId})`,
    ratings: sql<number[]>`array(SELECT rating from ${reviews} WHERE ${reviews.productId} = ${productId})`
  })
    .from(products)
    .leftJoin(discounts, eq(discounts.productId, products.id))
    .where(eq(products.id, productId))
    .limit(1)

  logInfo(_product)

  type Price = Omit<typeof _product, 'price' | 'discountType' | 'discountValue'> & {
    price: {
      amount: number
      discountLabel?: string
      discounted?: number
    }
  }

  type Discount = Omit<typeof _product, 'discountValue' | 'discountType' | 'price'> & {
    discountValue?: typeof _product['discountValue']
    discountType?: typeof _product['discountType']
  }
    type Combined = Omit<typeof _product, 'price' | 'discountType' | 'discountValue'> & Price & Discount

    const product = _product as unknown as Combined

    const price = _product.price

    if (product.discountValue !== null) {
      const discount = product.discountValue!
      const isTypeAmount = product.discountType === 'amount'

      product.price = {
        amount: price,
        discountLabel: isTypeAmount ? `-${discount}` : `-${discount}%`,
        discounted: isTypeAmount ? price - discount : Math.floor(price - (price * discount / 100)) + 0.99
      }

      delete product.discountValue
      delete product.discountType
    }
    else {
      product.price = {
        amount: price
      }
    }
    product.rating = product.ratings.reduce((acc, curr) => acc + curr, 0) / product.ratings.length
    delete product.ratings
    // FIXME: fix types
    return {
      ...product,
    }
}
// TODO: implement rating
// TODO: implement reviews
// TODO: implement stock (quantity)
// TODO: implement variants (colors, size)
declare global {
  export interface ProductDetails {
    id: number
    name: string
    desiredCount: string
    price: {
      amount: number
      discountLabel?: string
      discounted?: number
    }
    rating: number
    reviewCount: number | string
    image: string
    images: string[]
  }
}
