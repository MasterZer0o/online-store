import type { CreationOptional, InferAttributes, InferCreationAttributes, Model, } from 'sequelize'
import { DataTypes } from 'sequelize'
import db from '../client'

interface ShoppingSessionModel extends Model<InferAttributes<ShoppingSessionModel>, InferCreationAttributes<ShoppingSessionModel>> {
  id: string
  user_id: number
  total: number
  updated_at: CreationOptional<Date>
  created_at: CreationOptional<Date>

}

export const ShoppingSession = db.define<ShoppingSessionModel>('ShoppingSession', {
  id: {
    type: DataTypes.STRING(80),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  total: {
    type: DataTypes.DECIMAL
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
  tableName: 'shopping_sessions'
})

declare global {
  export interface ShoppingSession {
    id: string
    user_id: number
    total: number
    updated_at: Date
    created_at: Date
}
}
