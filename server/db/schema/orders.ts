import { integer, pgTable, real, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { products } from './products'
import { users } from './users'

export const orderDetails = pgTable('order_details', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  total: real('total').notNull(),
  userId: integer('user_id').notNull().references(() => users.id),
  status: varchar('status').notNull(),
  orderDate: timestamp('order_date', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  orderId: uuid('order_id').notNull().references(() => orderDetails.id),
  productId: integer('product_id').notNull().references(() => products.id),
  quantity: integer('quantity').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const payments = pgTable('payment_details', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  amount: real('amount').notNull(),
  status: varchar('status').notNull(),
  orderId: uuid('order_id').notNull().references(() => orderDetails.id),
  provider: varchar('provider').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const cartItem = pgTable('cart_items', {
  id: uuid('id').defaultRandom().notNull().primaryKey(),
  productId: integer('product_id').notNull().references(() => products.id),
  userId: integer('user_id').notNull().references(() => users.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

declare global {
  export type OrderItem = InferSelectModel<typeof orderItems>
  export type NewOrderItem = InferInsertModel<typeof orderItems>

  export type OrderDetails = InferSelectModel<typeof orderDetails>
  export type NewOrderDetails = InferInsertModel<typeof orderDetails>

  export type CartItem = InferSelectModel<typeof orderDetails>
  export type NewCartItem = InferInsertModel<typeof orderDetails>
}
