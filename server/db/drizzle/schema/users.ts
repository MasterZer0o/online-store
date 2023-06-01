import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import type { InferModel } from 'drizzle-orm'

const roles = ['admin', 'user', 'guest'] as const

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  password: varchar('password').notNull(),
  name: varchar('name').notNull(),
  lastname: varchar('lastname').notNull(),
  email: varchar('email').notNull(),
  role: varchar('role', { enum: roles }).default('user').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull()
})

declare global {
  export type UserDrizzle = InferModel<typeof users>
  export type NewUser = InferModel<typeof users, 'insert'>

  export type SessionDrizzle = InferModel<typeof sessions>
  export type NewSession = InferModel<typeof sessions, 'insert'>
}
