import {
  GameEntity,
  GameIdelEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
} from '@/entities/domain'
import { prisma } from '@/shared/lib/db'
import { Game, User } from '@prisma/client'
import { z } from 'zod'

async function gamesList(): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    include: {
      winner: true,
      players: true,
    },
  })
  return games.map(dbGameToGameEntity)
}

const fildSchema = z.array(z.union([z.string(), z.null()]))

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null }
): GameEntity {
  switch (game.status) {
    case 'idle': {
      return {
        id: game.id,
        players: game.players,
        status: game.status,
      } satisfies GameIdelEntity
    }
    case 'inProgress':
    case 'gameOverDraw': {
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fildSchema.parse(game.field),
      } satisfies GameOverDrawEntity | GameInProgressEntity
    }
    case 'gameOver': {
      if (!game.winner) {
        throw new Error('Game Over')
      }
      return {
        id: game.id,
        players: game.players,
        status: game.status,
        field: fildSchema.parse(game.field),
        winner: game.winner,
      } satisfies GameOverEntity
    }
  }
}

export const gameRepository = { gamesList }
