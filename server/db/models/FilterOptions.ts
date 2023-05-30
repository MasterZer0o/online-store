import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import { DataTypes } from 'sequelize'
import db from '../client'
import { Filter } from './Filter'

interface FilterOptionsModel extends Model<InferAttributes<FilterOptionsModel>, InferCreationAttributes<FilterOptionsModel>> {
  id: CreationOptional<number>
  name: string
  filter_id: string
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

declare global {
  export interface FilterOptions {
    id: number
    name: string
    filter_id: string
    created_at: Date
    updated_at: Date
  }
}

export const FilterOptions = db.define<FilterOptionsModel>(
  'FilterOptions', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    filter_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Filter,
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
    }
  },
  { timestamps: false, tableName: 'filter_options' }
)
