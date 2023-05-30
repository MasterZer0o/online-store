import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../client'
import { Product } from './Product'

interface DiscountModel extends Model<InferAttributes<DiscountModel>, InferCreationAttributes<DiscountModel>> {
  id: number
  name: string
  description: string
  value: number
  type: 'amount' | 'percent'
  product_id: string | null
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

declare global {
  export interface Discount {
    id: number
    name: string
    description: string
    value: number
    type: 'amount' | 'percent'
    product_id: string | null
    created_at: Date
    updated_at: Date
  }
}

export const Discount = db.define<DiscountModel>('Discount', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Product
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  value: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING(10),
    allowNull: false
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
  tableName: 'discounts'
})
