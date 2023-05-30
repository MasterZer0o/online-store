import sequelize from '../db/relations'
import { logError, logSuccess } from '~~/server/lib/logger'

export default defineNitroPlugin(async () => {
  try {
    await sequelize.authenticate()

    logSuccess('Connection has been established successfully.')
  }
  catch (error) {
    logError('error', 'Unable to connect to the database:', error)
  }
})
