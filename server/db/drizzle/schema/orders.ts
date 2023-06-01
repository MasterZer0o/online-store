import { integer, pgTable, real, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import type { InferModel } from 'drizzle-orm'

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().notNull(),
  orderId: varchar('order_id').notNull(),
  productId: integer('product_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const orderDetails = pgTable('order_details', {
  id: uuid('id').defaultRandom().notNull(),
  total: real('total').notNull(),
  paymentId: varchar('payment_id').notNull(),
  userId: integer('user_id').notNull(),
  status: varchar('status').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

export const payments = pgTable('payment_details', {
  id: uuid('id').defaultRandom().notNull(),
  orderId: varchar('order_id').notNull(),
  amount: real('amount').notNull(),
  status: varchar('status').notNull(),
  provider: varchar('provider').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
})

declare global {
  export type OrderItemDrizzle = InferModel<typeof orderItems>
  export type NewOrderItem = InferModel<typeof orderItems, 'insert'>

  export type OrderDetailsDrizzle = InferModel<typeof orderDetails>
  export type NewOrderDetails = InferModel<typeof orderDetails, 'insert'>
}
