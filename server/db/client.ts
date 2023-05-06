import sequelize from './config'
import { User } from './models/User'
import { Session } from './models/Session'
import { syncModels } from './syncModels'

import { Product } from './models/Product'
import { Discount } from './models/Discount'
import { ShoppingSession } from './models/ShoppingSession'
import { PaymentDetails } from './models/Payment'
import { OrderDetails } from './models/OrderDetails'
import { Category } from './models/Category'
import { CartItem } from './models/CartItem'
import { OrderItem } from './models/OrderItems'
import { seed } from './seeders/seed'
import type { Filter } from './models/Filter'

User.hasMany(Session, { foreignKey: 'user_id' })
Session.belongsTo(User, { foreignKey: 'user_id' })

Product.hasOne(Discount, { foreignKey: 'id' })
Discount.belongsTo(Product, { foreignKey: 'id' })

ShoppingSession.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(ShoppingSession, { foreignKey: 'user_id' })

OrderDetails.hasOne(User, { foreignKey: 'id' })
OrderDetails.belongsTo(User, { foreignKey: 'user_id' })
OrderDetails.hasOne(PaymentDetails, { foreignKey: 'id' })
PaymentDetails.belongsTo(OrderDetails, { foreignKey: 'id' })

CartItem.hasOne(Session, { foreignKey: 'id' })
Session.belongsTo(CartItem, { foreignKey: 'id' })

OrderItem.hasOne(OrderDetails, { foreignKey: 'id' })
// seed.seedProducts()
// seed.seedCategories()
// syncModels()

export default sequelize
