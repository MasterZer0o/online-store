import { DataTypes } from 'sequelize'
import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import db from '../config'
import { OrderDetails } from './OrderDetails'

interface PaymentDetailsModel extends Model<InferAttributes<PaymentDetailsModel>, InferCreationAttributes<PaymentDetailsModel>> {
  id: string
  order_id: string
  amount: number
  provider: string
  status: string
  created_at: CreationOptional<Date>
  updated_at: CreationOptional<Date>
}

export const PaymentDetails = db.define<PaymentDetailsModel>('PaymentDetails', {
  id: {
    type: DataTypes.STRING(80),
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  order_id: {
    type: DataTypes.STRING(80),
    allowNull: false,
    references: {
      model: OrderDetails,
      key: 'id'
    }
  },
  amount: {
    type: DataTypes.DECIMAL
  },
  provider: {
    type: DataTypes.STRING(50),
  },
  status: {
    type: DataTypes.STRING(50)
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
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  tableName: 'payment_details'
})

declare global {
  export interface PaymentDetails {
    id: string
    order_id: string
    amount: number
    provider: string
    status: string
  }
}
