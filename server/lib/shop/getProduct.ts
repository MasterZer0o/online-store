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
    images: sql<string[]>`array(SELECT ${images.url} from ${images} WHERE ${images.productId} = ${productId})`,
    reviewCount: sql<number>`(SELECT COUNT(*) FROM ${reviews} WHERE ${reviews.comment} IS NOT NULL AND ${reviews.productId} = ${productId})`,
    ratings: sql<number[]>`array(SELECT rating from ${reviews} WHERE ${reviews.productId} = ${productId})`,
    stock: stock.quantity,
    variants: sql<{ colorCode: string; colorName: string; size: string }[]>`array(SELECT json_build_object('colorName', color_name, 'colorCode', color_code, 'size', size) FROM ${variants} WHERE ${variants.productId} = ${productId})`
  })
    .from(products)
    .leftJoin(discounts, eq(discounts.productId, products.id))
    .leftJoin(stock, eq(stock.productId, productId))
    .where(eq(products.id, productId))
    .limit(1)

  const price = product.price
  const discount = product.discountValue
  const isDiscountTypeAmount = product.discountType === 'amount'

  return <ProductDetails>{
    id: product.id,
    name: product.name,
    image: product.image,
    desiredCount: product.desiredCount,
    images: product.images,
    stock: product.stock,
    price: {
      amount: price,
      discountLabel: discount ? `-${isDiscountTypeAmount ? discount : `${discount}%`}` : undefined,
      discounted: discount ? (isDiscountTypeAmount ? price - discount : Math.floor(price - (price * discount / 100)) + 0.99) : undefined
    },
    rating: product.ratings.reduce((acc, curr) => acc + curr, 0) / product.ratings.length,
    reviewCount: product.reviewCount,
    variants: product.variants
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
    stock: number
    image: string
    images: string[]
    variants: {
      size: string
      colorName: string
      colorCode: string
    }[]
  }
}
