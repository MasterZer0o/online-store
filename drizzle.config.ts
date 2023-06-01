import type { Config } from 'drizzle-kit'

export default {
  schema: './server/db/drizzle/schema/*',
  out: './migrations',
  connectionString: process.env.DATABASE_URL_DRIZZLE
} satisfies Config
