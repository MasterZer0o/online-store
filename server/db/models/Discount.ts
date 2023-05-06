import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../config'

interface DiscountModel extends Model<InferAttributes<DiscountModel>, InferCreationAttributes<DiscountModel>> {
  id: string
  name: string
  description: string
  percent: number
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

declare global {
  export interface Discount {
    id: string
    name: string
    description: string
    percent: number
    created_at: Date
    updated_at: Date
  }
}

export const Discount = db.define<DiscountModel>('Discount', {
  id: {
    type: DataTypes.STRING(80),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  percent: {
    type: DataTypes.DECIMAL,
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
