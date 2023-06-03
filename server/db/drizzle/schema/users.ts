import { integer, pgTable, serial, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import type { InferModel } from 'drizzle-orm'
import { products } from './products'

const roles = ['admin', 'user', 'guest'] as const

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  password: varchar('password').notNull(),
  name: varchar('name').notNull(),
  lastname: varchar('lastname').notNull(),
  email: varchar('email').notNull(),
  role: varchar('role', { enum: roles }).default('user').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
})

export const sessions = pgTable('sessions', {
  id: uuid('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade',
  }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})

export const wishlist = pgTable('wishlist', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, {
    onDelete: 'cascade'
  }),
  productId: integer('product_id').notNull().references(() => products.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
})

declare global {
  export type UserDrizzle = InferModel<typeof users>
  export type NewUser = InferModel<typeof users, 'insert'>

  export type SessionDrizzle = InferModel<typeof sessions>
  export type NewSession = InferModel<typeof sessions, 'insert'>

  export type WishlistDriz = InferModel<typeof wishlist>
  export type NewWishlist = InferModel<typeof wishlist, 'insert'>
}
