import { integer, pgTable, real, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import type { InferModel } from 'drizzle-orm'

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  slug: varchar('slug').notNull(),
  type: varchar('type', { enum: ['main', 'subcategory'] }).notNull(),
  relatedTo: integer('related_to'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description').notNull(),
  price: real('price').notNull(),
  image: varchar('image').notNull(),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  SKU: varchar('SKU').notNull(),
  ratingRate: real('rating_rate').notNull().default(0),
  ratingCount: integer('rating_count').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const discounts = pgTable('discounts', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  description: varchar('description'),
  value: real('value').notNull(),
  type: varchar('type', { enum: ['percentage', 'amount'] }).notNull(),
  productId: integer('product_id').notNull().references(() => products.id, {
    onDelete: 'cascade'
  }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

declare global {
  export type ProductModel = InferModel<typeof products>
  export type NewProductModel = InferModel<typeof products, 'insert'>

  export type Category = InferModel<typeof categories>
  export type NewCategory = InferModel<typeof categories, 'insert'>

  export type Discount = InferModel<typeof discounts>
  export type NewDiscount = InferModel<typeof discounts, 'insert'>
}
