import { integer, pgTable, real, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
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
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const variants = pgTable('variants', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  price: real('price').notNull(),
  SKU: varchar('SKU').notNull(),
  size: varchar('size', { length: 25 }).notNull(),
  colorName: varchar('color_name', { length: 25 }).notNull(),
  colorCode: varchar('color_code', { length: 25 }).notNull(),
  stock: integer('stock').notNull(),
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
  updatedAt: timestamp('updated_at', { withTimezone: true })
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
  variants: many(variants),
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
  export type ProductModel = InferSelectModel<typeof products>
  export type NewProductModel = InferInsertModel<typeof products>

  export type Category = InferSelectModel<typeof categories>
  export type NewCategory = InferInsertModel<typeof categories>

  export type DiscountModel = InferSelectModel<typeof discounts>
  export type NewDiscount = InferInsertModel<typeof discounts>

  export type Stock = InferSelectModel<typeof stock>
  export type NewStock = InferInsertModel<typeof stock>

  export type Image = InferSelectModel<typeof images>
  export type NewImage = InferInsertModel<typeof images>

  export type Review = InferSelectModel<typeof reviews>
  export type NewReview = InferInsertModel<typeof reviews>

  export type Variant = InferSelectModel<typeof variants>
  export type NewVariant = InferInsertModel<typeof variants>
}
