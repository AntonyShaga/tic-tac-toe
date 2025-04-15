'use client'

import {
  AuthFields,
  AuthFormLayout,
  BottomLink,
  ErrorMessage,
  SubmitButton,
} from '@/features/auth'
import { right } from '@/shared/lib/either'
import { useActionState } from '@/shared/lib/react'
import { signUpActions } from '@/features/actions/sign-up'

export function SignUpForm() {
  const [formState, action, isPending] = useActionState(
    signUpActions,
    right(undefined)
  )

  return (
    <AuthFormLayout
      title={'Sign Up'}
      description={'Create your account to get started'}
      fields={<AuthFields />}
      error={<ErrorMessage error={formState} />}
      action={action}
      actions={<SubmitButton isPending={isPending}>Sign Up</SubmitButton>}
      links={
        <BottomLink
          linkText={'Sign in'}
          text={'Already have an account?'}
          url={'/sign-in'}
        />
      }
    />
  )
}
