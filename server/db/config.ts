import { Sequelize } from 'sequelize'
import { logInfo } from '~~/server/lib/logger'

const { DATABASE_URL } = useRuntimeConfig()

const sequelize = new Sequelize(DATABASE_URL, {
  pool: {
    max: 10,
    min: 0
  },
  benchmark: true,
  logging: false
  // logging: process.env.NODE_ENV === 'production' ? false : (sql, timing) => logInfo(sql, `[${timing}ms]`)
})
export default sequelize
