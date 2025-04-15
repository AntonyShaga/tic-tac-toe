import { GameIdelEntity } from '@/entities/game/domain'
import { gameRepository } from '@/entities/game/repositories/game'

export async function getIdleGames(): Promise<GameIdelEntity[]> {
  const games = await gameRepository.gamesList({
    status: 'idle',
  })
  return games as GameIdelEntity[]
}
