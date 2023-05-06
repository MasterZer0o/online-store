import { DataTypes } from 'sequelize'
import db from '../config'
import { User } from './User'

export const Session = db.define<UserSessionModel>('Session', {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'user'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
},
{
  timestamps: false,
  tableName: 'sessions'
}
)
