import fs from 'node:fs/promises'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import pg from 'pg'
import { consola } from 'consola'
import 'dotenv/config'
import { genImport } from 'knitwork'

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL_DRIZZLE
})

const db = drizzle(pool, { logger: true })

try {
  consola.info('Running migration...')
  await migrate(db, { migrationsFolder: './migrations' })

  consola.info('Generating TS exports...')
  const files = await fs.readdir('server/db/drizzle/schema')
  let input = ''

  for (const file of files) {
    const importName = file.slice(0, file.indexOf('.'))
    input += `${genImport(`./schema/${importName}`, { name: '*', as: importName })}\n`
  }
  input += '\nexport const schemas = {\n'
  files.forEach((file) => {
    input += `  ...${file.slice(0, file.indexOf('.'))},\n`
  })
  input += '}\n'
  await fs.writeFile('server/db/drizzle/exports.ts', input)
  consola.success('Generated TS exports.')

  consola.success('Migration complete.')
}
catch (error) {
  consola.error(error)
}
