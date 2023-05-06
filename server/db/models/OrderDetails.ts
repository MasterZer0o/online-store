import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../config'

interface OrderDetailsModel extends Model<InferAttributes<OrderDetailsModel>, InferCreationAttributes<OrderDetailsModel>> {
  id: string
  total: number
  payment_id: string
  user_id: number
  created_at: CreationOptional<Date>
}

export const OrderDetails = db.define<OrderDetailsModel>('OrderDetails', {
  id: {
    type: DataTypes.STRING(80),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  payment_id: {
    type: DataTypes.STRING(80),
    allowNull: false,
    references: {
      model: 'payment_details',
      key: 'id'
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },

},
{
  timestamps: false,
  tableName: 'order_details'
})

declare global {
  export interface OrderDetails {
    id: string
    total: number
    payment_id: string
    user_id: number
    created_at: Date
  }
}
