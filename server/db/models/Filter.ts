import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { DataTypes } from 'sequelize'
import db from '../config'
import { Category } from './Category'

interface ProductFilter extends Model<InferAttributes<ProductFilter>, InferCreationAttributes<ProductFilter>> {
  id: string
  name: string
  category_id: string
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

declare global {
  export interface FilterType {
    id: string
    name: string
    created_at: Date
    updated_at: Date
  }
}

export const Filter = db.define<ProductFilter>('Filter', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  category_id: {
    type: DataTypes.STRING(80),
    references: {
      model: Category,
      key: 'id'
    },
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
},
{ timestamps: false, tableName: 'filters' })
