import type { Config } from 'drizzle-kit'

export default {
  schema: './server/db/schema/*',
  out: './server/db/migrations',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL ?? 'DATABASE URL ENV NOT PROVIDED.'
  }
} satisfies Config
