import type { InferInsertModel, InferSelectModel } from 'drizzle-orm'
import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { categories } from './products'

export const filters = pgTable('filters', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  categoryId: integer('category_id').notNull().references(() => categories.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})

export const filterOptions = pgTable('filter_options', {
  id: serial('id').primaryKey(),
  name: varchar('name').notNull(),
  filterId: integer('filter_id').notNull().references(() => filters.id),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }),
})

declare global {
  export type FilterOptions = InferSelectModel<typeof filterOptions>
  export type NewFilterOptions = InferInsertModel<typeof filterOptions>

  export type Filter = InferSelectModel<typeof filterOptions>
  export type NewFilter = InferInsertModel<typeof filterOptions>

}
