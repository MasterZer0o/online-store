import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../client'
import { Category } from './Category'

interface ProductModel extends Model<InferAttributes<ProductModel>, InferCreationAttributes<ProductModel>> {
  id: CreationOptional<number>
  name: string
  description: string
  price: number
  product_image: string
  SKU: string
  rating_rate: number
  rating_count: number
  category_id: string
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
  count?: string | number
}
export const Product = db.define<ProductModel>('Product', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  product_image: {
    type: DataTypes.STRING
  },
  SKU: {
    type: DataTypes.STRING(80)
  },
  rating_rate: {
    type: DataTypes.DECIMAL,
    defaultValue: 0
  },
  rating_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  category_id: {
    type: DataTypes.STRING(80),
    references: {
      model: Category,
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
  }
},
{
  tableName: 'products',
  timestamps: false
})
type Amount = number
declare global {
  export interface Product {
    id: number
    name: string
    description: string
    price: {
      amount: Amount
      discountedAmount?: Amount
      discountLabel?: string
  }
    product_image: string
    SKU: string
    rating_rate: number
    rating_count: number
    category_id: string
    created_at: Date
    updated_at: Date
  }
}
