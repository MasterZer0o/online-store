import type { Model, ModelStatic } from 'sequelize'
import { logInfo, logSuccess } from '../lib/logger'

import { User } from './models/User'
import { Session } from './models/Session'
import { CartItem } from './models/CartItem'
import { Category } from './models/Category'
import { Discount } from './models/Discount'
import { PaymentDetails } from './models/Payment'
import { OrderItem } from './models/OrderItems'
import { OrderDetails } from './models/OrderDetails'
import { Product } from './models/Product'
import { ShoppingSession } from './models/ShoppingSession'
import { Filter } from './models/Filter'

export async function syncModels(force?: boolean, _models?: ModelStatic<Model>[]) {
  console.log('------------------------')
  if (_models) {
    for (const model of _models) {
      await model.sync({ alter: force !== true, logging: true, force: !!force })
      logSuccess(`Synced: ${model.name} ${force ? '[forcefully]' : ''}`)
    }
    console.log('------------------------')

    return
  }

  const models = [
    User, Session, CartItem, Category, PaymentDetails,
    OrderItem, OrderDetails, Product, ShoppingSession,
    Discount, Filter
  ]

  for (const model of models) {
    await model.sync({ alter: true, logging: false })
    logSuccess(`Synced: ${model.name}`)
    // await model.sync({ alter: true, logging: sql => logInfo(sql) })
  }
  console.log('------------------------')
}
