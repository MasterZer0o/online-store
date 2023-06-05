import fs from 'node:fs/promises'
import { getDb } from '../../utils/getDb'
import { logSuccess } from '../../utils/logger'
import { categories, products } from '../schema/products'

const db = getDb()

async function seedCategories() {
  const categoriesContent: { name: string; type: 'main' | 'subcategory'; slug: string }[]
    = JSON.parse(await fs.readFile('data/categories.json', { encoding: 'utf-8' }))

  await db.insert(categories).values(categoriesContent)
  logSuccess('Successfully added categories.')
}

async function seedProducts() {
  let productsContent = JSON.parse(await fs.readFile('data/byCategory/bluzy.json', { encoding: 'utf-8' }))

  productsContent = productsContent.map((product: { name: string; image: string; price: string }) => {
    return {
      name: product.name,
      image: product.image,
      categoryId: 10,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: parseFloat(`${product.price}`),
      SKU: 'sku',
    }
  }) as NewProduct[]

  await db.insert(products).values(productsContent)

  let productsContent2 = JSON.parse(await fs.readFile('data/byCategory/spodnie.json', { encoding: 'utf-8' }))

  productsContent2 = productsContent2.map((product: { name: string; image: string; price: string }) => {
    return {
      name: product.name,
      image: product.image,
      categoryId: 8,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      price: parseFloat(`${product.price}`),
      SKU: 'sku',
    }
  }) as NewProduct[]

  await db.insert(products).values(productsContent2)

  logSuccess('Successfully added products.')
}

seedCategories()
