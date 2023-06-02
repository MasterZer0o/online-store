import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../client'
import { Product } from './Product'
import { Session } from './Session'

interface CartItemModel extends Model<InferAttributes<CartItemModel>, InferCreationAttributes<CartItemModel>> {
  id: string
  quantity: number
  session_id: string
  product_id: number
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

export const CartItem = db.define<CartItemModel>('CartItem', {
  id: {
    type: DataTypes.STRING(80),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.SMALLINT,
    allowNull: false
  },
  session_id: {
    type: DataTypes.STRING(80),
    allowNull: false,
    references: {
      model: Session,
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
  tableName: 'cart_items'
})
declare global {
  export interface CartItem {
    id: string
    quantity: number
    session_id: string
    product_id: number
    created_at: Date
    updated_at: Date
  }
}
