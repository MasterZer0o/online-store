import type { CreationOptional, InferAttributes, InferCreationAttributes, Model, } from 'sequelize'
import { DataTypes } from 'sequelize'
import db from '../client'

interface WishlistItemModel extends Model<InferAttributes<WishlistItemModel>, InferCreationAttributes<WishlistItemModel>> {
  id: CreationOptional<number>
  product_id: number
  user_id: number
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

export const WishlistItem = db.define<WishlistItemModel>('WishlistItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull: false,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'users'
      }
    }
  },
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: {
        tableName: 'products'
      }
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
  tableName: 'wishlist_items',
  timestamps: false
})

declare global {
  export interface WishlistItem {
    id: number
    product_id: number
    user_id: number
    created_at: Date
    updated_at: Date
  }
}
