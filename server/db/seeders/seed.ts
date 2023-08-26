import { readFile } from 'node:fs/promises'
import { getDb } from '../../utils/getDb'
import { logError, logInfo, logSuccess } from '../../utils/logger'

const db = getDb()

async function seedCategories() {
  const categories = (await import('../schema/products')).categories

  const categoriesContent: { name: string; type: 'main' | 'subcategory'; slug: string }[]
    = JSON.parse(await readFile('data/categories.json', { encoding: 'utf-8' }))

  await db.insert(categories).values(categoriesContent)
  logSuccess('Successfully added categories.')
}

async function seedProducts() {
  const products = (await import('../schema/products')).products
  let productsContent = JSON.parse(await readFile('data/byCategory/bluzy.json', { encoding: 'utf-8' }))

  productsContent = productsContent.map((product: { name: string; image: string; price: string }) => {
    return {
      name: product.name,
      image: product.image,
      categoryId: 10,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: Number.parseFloat(`${product.price}`),
      SKU: 'sku',
    }
  }) as NewProductModel[]

  await db.insert(products).values(productsContent)

  let productsContent2 = JSON.parse(await readFile('data/byCategory/spodnie.json', { encoding: 'utf-8' }))

  productsContent2 = productsContent2.map((product: { name: string; image: string; price: string }) => {
    return {
      name: product.name,
      image: product.image,
      categoryId: 8,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: Number.parseFloat(`${product.price}`),
      SKU: 'sku',
    }
  }) as NewProductModel[]

  await db.insert(products).values(productsContent2)

  logSuccess('Successfully added products.')
}

async function seedReviews() {
  try {
    const reviews = (await import('../schema/products')).reviews
    const users = (await import('../schema/users')).users
    const texts: string[] = JSON.parse(await readFile('data/reviews.json', { encoding: 'utf-8' }))

    logInfo(`Inserting ${texts.length} reviews.`)

    texts.push(undefined as any)

    const ratings = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]

    const objs: NewReview[] = []
    const userIds = await db.select({ id: users.id }).from(users)

    for (const text of texts) {
      objs.push({
        comment: text,
        productId: 1,
        rating: ratings[Math.floor(Math.random() * ratings.length)],
        userId: userIds[Math.floor(Math.random() * userIds.length)].id
      })
    }
    const p1 = performance.now()

    await db.insert(reviews).values(objs)

    const p2 = performance.now()

    logSuccess(`Successfully added ${texts.length} reviews in ${(p2 - p1).toFixed(1)}ms.`)
  }
  catch (error) {
    logError(error)
  }
}
