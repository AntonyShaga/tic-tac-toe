import { PlayerEntity } from '@/entities/domain'
import { gameRepository } from '@/entities/repositories/game'
import cuid from 'cuid'

export async function createGame(playar: PlayerEntity) {
  const playarGames = await gameRepository.gamesList({
    players: { some: { id: playar.id } },
    status: 'idle',
  })

  if (
    playarGames.some(
      (game) => game.status === 'idle' && game.creator.id === playar.id
    )
  ) {
    return {
      type: 'error',
      error: 'Player cannot create more than one game',
    } as const
  }
  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: playar,
    status: 'idle',
  })
  return createdGame
}
