import { eq } from 'drizzle-orm'
import { discounts, products } from '../../db/schema/products'

export async function getProduct(productId: string | number): Promise<ProductDetails | { error: {
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

  const _product = (await db.select({
    id: products.id,
    name: products.name,
    description: products.description,
    price: products.price,
    image: products.image,
    ratingCount: products.ratingCount,
    discountValue: discounts.value,
    discountType: discounts.type,
  })
    .from(products)
    .leftJoin(discounts, eq(discounts.productId, products.id))
    .where(eq(products.id, productId))
    .limit(1))[0]

  const price = _product.price as number

  type Price = Omit<typeof _product, 'price' | 'discountType' | 'discountValue'> & {
    price: {
      amount: number
      discountLabel?: string
      discountedAmount?: number
    }
  }

  type Discount = Omit<typeof _product, 'discountValue' | 'discountType' | 'price'> & {
    discountValue?: typeof _product['discountValue']
    discountType?: typeof _product['discountType']
  }

    type Combined = Omit<typeof _product, 'price' | 'discountType' | 'discountValue'> & Price & Discount

    const product = _product as unknown as Combined

    if (product.discountValue !== null) {
      const discount = product.discountValue!
      const isTypeAmount = product.discountType === 'amount'

      product.price = {
        amount: price,
        discountLabel: isTypeAmount ? `-${discount}` : `-${discount}%`,
        discountedAmount: isTypeAmount ? price - discount : Math.floor(price - (price * discount / 100)) + 0.99
      }

      delete product.discountValue
      delete product.discountType
    }
    else {
      product.price = {
        amount: price
      }
    }

    return {
      ...product,
      reviewCount: 33,
      desiredCount: 109,
      rating: {
        average: 3.4,
        count: 231
      }
    }
}
// TODO: implement rating
// TODO: implement reviews
// TODO: implement in-wishlist
declare global {
  export interface ProductDetails {
    id: number
    name: string
    reviewCount: number
    desiredCount: number
    price: {
      amount: number
      discountLabel?: string
      discountedAmount?: number
    }
    rating: {
      count: number
      average: number
    }
    image: string
  }
}
