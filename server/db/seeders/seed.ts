// import db from '../client'
import fs from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { Category } from '../models/Category.js'
import { Product } from '../models/Product.js'
import { logSuccess } from '~~/server/lib/logger'

async function seedCategories() {
  const categories: { name: string; image: string;slug: string }[] = JSON.parse(await fs.readFile('data/categories.json', { encoding: 'utf-8' }))
  for (const category of categories) {
    await Category.upsert({
      id: randomUUID(),
      name: category.name,
      image: category.image,
      slug: category.slug

    })
    logSuccess('Added category: ', category.name)
  }
}

async function seedProducts() {
  const products = JSON.parse(await fs.readFile('data/byCategory/bluzy.json', { encoding: 'utf-8' }))

  for (const product of products) {
    if (!product.price.includes('%') && !product.price.includes('Smart! okazja'))
      await Product.upsert({
        name: product.title,
        product_image: product.image,
        category_id: '8fc6183c-e154-49a9-a895-57b62dc78225',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
        discount_id: null,
        price: product.price,
        rating_rate: product?.rating?.rate || 0,
        rating_count: product?.rating?.count || 0,
        SKU: 'sku',
      })

    logSuccess('Added product: ', product.title)
  }
}

export const seed = {
  seedCategories,
  seedProducts
}
