import type { InferModel } from 'drizzle-orm'
import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

export const filterOptions = pgTable('filter_options', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  filterId: integer('filter_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})

export const filters = pgTable('filters', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  categoryId: integer('category_id').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})

declare global {
  export type FilterOptionsDriz = InferModel<typeof filterOptions>
  export type NewFilterOptions = InferModel<typeof filterOptions, 'insert'>

  export type FilterDriz = InferModel<typeof filterOptions>
  export type NewFilter = InferModel<typeof filterOptions, 'insert'>

}
