import {
  GameEntity,
  GameIdelEntity,
  GameInProgressEntity,
  GameOverDrawEntity,
  GameOverEntity,
} from '@/entities/domain'
import { prisma } from '@/shared/lib/db'
import { Game, Prisma, User } from '@prisma/client'
import { z } from 'zod'
import { removePassword } from '@/shared/lib/password'

async function gamesList(where?: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
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
  const players = game.players.map(removePassword)
  switch (game.status) {
    case 'idle': {
      const [creator] = players
      if (!creator) {
        throw new Error('creator not found')
      }
      return {
        id: game.id,
        creator: creator,
        status: game.status,
      } satisfies GameIdelEntity
    }
    case 'inProgress':
    case 'gameOverDraw': {
      return {
        id: game.id,
        players: players,
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
        players: players,
        status: game.status,
        field: fildSchema.parse(game.field),
        winner: game.winner,
      } satisfies GameOverEntity
    }
  }
}

export const gameRepository = { gamesList }
