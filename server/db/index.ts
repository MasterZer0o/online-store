import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import type { Logger } from 'drizzle-orm/logger'
import { schemas } from './exports'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
})

class MyLogger implements Logger {
  logQuery(query: string, params: unknown[]): void {
    logInfo('SQL QUERY: \n', `${query}`)
    let p = ''
    params.forEach((param, i) => p += `$${i + 1}=${param}, `)
    process.stdout.write('\n')
    logInfo('params:', p)
    process.stdout.write(`${''.padEnd(p.length + 8, '-')}\n`)
  }
}

export const db = drizzle(pool, {
  schema: { ...schemas },
  logger: new MyLogger()
})
