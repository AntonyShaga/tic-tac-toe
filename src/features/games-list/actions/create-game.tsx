'use server'

import { createGame } from '@/entities/server'
import { prisma } from '@/shared/lib/db'
import { left } from '@/shared/lib/either'

export const createGameAction = async () => {
  const user = await prisma.user.findFirst({})
  if (!user) {
    return left('User not found' as const)
  }
  const gameResult = await createGame(user)

  return gameResult
}
