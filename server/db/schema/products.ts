import { integer, pgTable, real, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { type InferModel, relations } from 'drizzle-orm'
import { users } from './users'

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

export const discountRelations = relations(discounts, ({ one }) => ({
  product: one(products, {
    fields: [discounts.productId],
    references: [products.id]
  })
}))

export const stock = pgTable('stock', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  updatedAt: timestamp('updated_at', {
    withTimezone: true
  })
})

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  url: varchar('url').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  userId: integer('user_id').notNull().references(() => users.id),
  rating: real('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const productRelations = relations(products, ({ many, one }) => ({
  images: many(images),
  discount: one(discounts, {
    fields: [products.id],
    references: [discounts.productId]
  }),
  reviews: many(reviews)
}))

export const imageRelations = relations(images, ({ one }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.id]
  })
}))

export const reviewRelations = relations(users, ({ one }) => ({
  review: one(reviews, {
    fields: [users.id],
    references: [reviews.userId]
  })
}))

declare global {
  export type ProductModel = InferModel<typeof products>
  export type NewProductModel = InferModel<typeof products, 'insert'>

  export type Category = InferModel<typeof categories>
  export type NewCategory = InferModel<typeof categories, 'insert'>

  export type Discount = InferModel<typeof discounts>
  export type NewDiscount = InferModel<typeof discounts, 'insert'>

  export type Stock = InferModel<typeof stock>
  export type NewStock = InferModel<typeof stock, 'insert'>

  export type Image = InferModel<typeof images>
  export type NewImage = InferModel<typeof images, 'insert'>

  export type Review = InferModel<typeof reviews>
  export type NewReview = InferModel<typeof reviews, 'insert'>
}
