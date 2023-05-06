import type { CreationOptional, InferAttributes, InferCreationAttributes, Model } from 'sequelize'

export { }
declare global {
  export type RegisterError = {
    [value in RegisterField]: RegError
  }

  export interface HashError {
    error: string
  }

  export type UserRole = 'admin' | 'user' | 'guest'

  export interface User {
    id: number
    username: string
    password: string
    email: string
    role: UserRole
    last_access?: number
  }
  export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    id: CreationOptional<number>
    username: string
    password: string
    email: string
    role: CreationOptional<UserRole>
    last_access: CreationOptional<number>
    created_at: CreationOptional<Date>
    updated_at: CreationOptional<Date>
  }

  export interface UserSession {
    id: string
    timeCreated?: string
    user_id: number
    role: UserRole
  }

  export interface UserSessionModel extends Model<InferAttributes<UserSessionModel>, InferCreationAttributes<UserSessionModel>> {
    id: string
    created_at: string
    user_id: number
    role: UserRole
  }

  export type UserLoginResponse = {
    userId: number
    username: string
    role: UserRole
  } | null

  export interface UserSessionInfo {
    userId: number
    id: string
    role: UserRole
  }

  export interface ClientSessionData {
    user?: {
      username: string
      role?: UserRole
      remember?: boolean
    }
    redirectURL?: string
    csrf: string
  }

  export interface UserLoginCredentials {
    login: string
    password: string
    remember?: boolean
  }

  export interface RegisterUser {
    username: string
    email: string
    password: string
    passwordRepeat: string
  }

  export interface ValidationError {
    error: {
      message: string
    }
  }

  export interface LoginResponse {
    status: string
    username?: string
    role?: string | null
    error?: boolean
  }

  export type RegisterErrorType = 'emptyField' | 'notMatching' | 'badEmail' | 'characters' | 'usernameLength' | 'passwordLength'

  interface RegError {
    isError: boolean
    message: string
  }

  export type RegisterField = 'username' | 'email' | 'password' | 'passwordRepeat'
}
