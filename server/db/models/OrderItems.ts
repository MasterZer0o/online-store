import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../client'
import { OrderDetails } from './OrderDetails'
import { Product } from './Product'

interface OrderItemModel extends Model<InferAttributes<OrderItemModel>, InferCreationAttributes<OrderItemModel>> {
  id: string
  order_id: string
  product_id: string
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

export const OrderItem = db.define<OrderItemModel>('OrderItem', {
  id: {
    type: DataTypes.STRING(80),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.STRING(80),
    allowNull: false,
    references: {
      model: OrderDetails,
      key: 'id'
    }
  },

  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

}, {
  timestamps: false,
  tableName: 'order_items'
})

declare global {
  export interface OrderItems {
    id: string
    order_id: string
    product_id: string
    created_at: Date
    updated_at: Date
  }
}
