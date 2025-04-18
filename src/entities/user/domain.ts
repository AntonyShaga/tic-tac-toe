import { UserId } from '@/kernel/ids'

export type UserEntity = {
  id: UserId
  login: string
  rating: number
  passwordHash: string
  salt: string
}
export type SessionEntity = {
  id: UserId
  login: string
  rating: number
}
export const DEFAULT_RATING = 1000
