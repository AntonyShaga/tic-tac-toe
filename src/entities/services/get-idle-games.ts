import { GameIdelEntity } from '@/entities/domain'
import { gameRepository } from '@/entities/repositories/game'

export async function getIdleGames(): Promise<GameIdelEntity[]> {
  const games = await gameRepository.gamesList({
    status: 'idle',
  })
  return games as GameIdelEntity[]
}
