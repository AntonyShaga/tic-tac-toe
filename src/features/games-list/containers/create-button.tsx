'use client'
import { Button } from '@/shared/ui/button'
import { createGameAction } from '@/features/games-list/actions/create-game'
import { useActionState } from '@/shared/lib/react'
import { mapLeft, right } from '@/shared/lib/either'
import { startTransition } from 'react'

export function CreateButton() {
  const [state, dispatch, isPending] = useActionState(
    createGameAction,
    right(undefined)
  )
  return (
    <div className={'flex flex-col gap-1'}>
      <Button
        disabled={isPending}
        onClick={() => startTransition(dispatch)}
        error={mapLeft(
          state,
          (e) =>
            ({
              ['Player cannot create more than one game']:
                'Вы можете создать только одну игру',
              ['User not found']: 'Пользователя нету',
            })[e]
        )}
      >
        Создать игру
      </Button>
    </div>
  )
}
