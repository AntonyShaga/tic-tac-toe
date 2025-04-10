import { getIdleGames } from '@/entities/server'

import { GameCard } from '@/features/games-list/ui/game-card'
import { Layout, CreateButton } from '@/features/games-list/server'

export async function GameList() {
  const games = await getIdleGames()

  return (
    <Layout actions={<CreateButton />}>
      {games.map((game) => {
        return (
          <GameCard
            key={game.id}
            login={game.creator.login}
            rating={game.creator.rating}
          />
        )
      })}
    </Layout>
  )
}
