import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../config'

interface CategoryModel extends Model<InferAttributes<CategoryModel>, InferCreationAttributes<CategoryModel>> {
  id: string
  name: string
  slug: string
  image: string
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

export const Category = db.define<CategoryModel>('Category', {
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
  image: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'categories',
  timestamps: false
})

declare global {
export interface Category {
  id: string
  name: string
  image: string
  slug: string
  updated_at: Date
  created_at: Date
}
}
