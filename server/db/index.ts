import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import { schemas } from './exports'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

export const db = drizzle(pool, {
  schema: { ...schemas },
  // logger: true
})
