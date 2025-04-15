import { GameId, UserId } from '@/kernel/ids'

export type GameEntity =
  | GameIdelEntity
  | GameInProgressEntity
  | GameOverEntity
  | GameOverDrawEntity

export type GameIdelEntity = {
  id: GameId
  creator: PlayerEntity
  status: 'idle'
}
export type GameInProgressEntity = {
  id: GameId
  players: PlayerEntity[]
  field: Field
  status: 'inProgress'
}
export type GameOverEntity = {
  id: GameId
  players: PlayerEntity[]
  field: Field
  status: 'gameOver'
  winner: PlayerEntity
}
export type GameOverDrawEntity = {
  id: GameId
  players: PlayerEntity[]
  field: Field
  status: 'gameOverDraw'
}
export type PlayerEntity = {
  id: UserId
  login: string
  rating: number
}
export type Field = Cell[]
export type Cell = GameSymbol | null
export type GameSymbol = string
