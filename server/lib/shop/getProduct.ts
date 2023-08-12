import { eq, sql } from 'drizzle-orm'
import { discounts, images, products, reviews, stock, variants } from '../../db/schema/products'
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

  const [product] = await db.select({
    id: products.id,
    name: products.name,
    description: products.description,
    price: products.price,
    image: products.image,
    discountValue: discounts.value,
    discountType: discounts.type,
    desiredCount: sql<string>`(SELECT COUNT(*) FROM ${wishlist} WHERE ${wishlist.productId} = ${productId})`,
    images: sql<string[]>`array(SELECT ${images.url} FROM ${images} WHERE ${images.productId} = ${productId})`,
    reviewCount: sql<number>`(SELECT COUNT(*) FROM ${reviews} WHERE ${reviews.comment} IS NOT NULL AND ${reviews.productId} = ${productId})`,
    ratings: sql<number[]>`array(SELECT ${reviews.rating} FROM ${reviews} WHERE ${reviews.productId} = ${productId})`,
    stock: stock.quantity,
    variants: sql<{ colorCode: string; colorName: string; size: string; price: number;stock: number }[]>`array(SELECT json_build_object('colorName', color_name, 'colorCode', color_code, 'size', size, 'stock', stock, 'price', price) FROM ${variants} WHERE ${variants.productId} = ${productId})`
  })
    .from(products)
    .leftJoin(discounts, eq(discounts.productId, products.id))
    .leftJoin(stock, eq(stock.productId, productId))
    .where(eq(products.id, productId))
    .limit(1)

  // logInfo(product)

  const price = product.price
  const discount = product.discountValue
  const isDiscountTypeAmount = product.discountType === 'amount'

  const final: ProductDetails = {
    id: product.id,
    name: product.name,
    image: product.image,
    desiredCount: product.desiredCount,
    images: product.images,
    price: {
      amount: price,
      discountLabel: discount ? `-${isDiscountTypeAmount ? discount : `${discount}%`}` : undefined,
      discountedAmount: discount ? calculateDiscount({ isTypeAmount: isDiscountTypeAmount, value: discount }, price) : undefined
    },
    rating: calculateRating(product.ratings),
    reviewCount: product.reviewCount,
    variants: product.variants.map(variant => ({
      ...variant,
      stock: undefined,
      available: variant.stock !== 0
    }))
  }

  return final
}
function calculateDiscount(discount: { isTypeAmount: boolean; value: number }, price: number) {
  return discount.isTypeAmount ? price - discount.value : Math.floor(price - (price * discount.value / 100)) + 0.99
}

function calculateRating(ratings: number[]) {
  return ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
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
      discountedAmount?: number
    }
    rating: number
    reviewCount: number | string
    image: string
    images: string[]
    variants: {
      size: string
      colorName: string
      colorCode: string
      price: number
      available: boolean
    }[]
  }
}
