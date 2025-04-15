import { PlayerEntity } from '@/entities/game/domain'
import { gameRepository } from '@/entities/game/repositories/game'
import cuid from 'cuid'
import { left, right } from '@/shared/lib/either'

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
    return left('Player cannot create more than one game' as const)
  }
  const createdGame = await gameRepository.createGame({
    id: cuid(),
    creator: playar,
    status: 'idle',
  })
  return right(createdGame)
}
