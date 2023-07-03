import { eq } from 'drizzle-orm'
import { discounts, products } from '../../db/schema/products'

export async function getProduct(productId: string | number) {
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

  const product = _product as unknown as Omit<typeof _product, 'price'> & {
    price: {
      amount: number
      discountLabel?: string
      discountedAmount?: number
    } }

  if (product.discountValue !== null) {
    const discount = product.discountValue
    const isTypeAmount = product.discountType === 'amount'

    product.price = {
      amount: price,
      discountLabel: isTypeAmount ? `-${discount}` : `-${discount}%`,
      discountedAmount: isTypeAmount ? price - discount : Math.floor(price - (price * discount / 100)) + 0.99
    }
  }
  else {
    product.price = {
      amount: price
    }
  }

  return product
}
