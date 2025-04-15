'use client'

import { useState } from 'react'
import {
  AuthFields,
  AuthFormLayout,
  BottomLink,
  ErrorMessage,
  SubmitButton,
} from '@/features/auth'
import { right } from '@/shared/lib/either'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const hendleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill all fields')
      return
    }
  }
  return (
    <AuthFormLayout
      title={'Sign In'}
      description={'Welcome back! Please sign in in to your account'}
      fields={
        <AuthFields
          login={email}
          password={password}
          onChangeLogin={setEmail}
          onChangePassword={setPassword}
        />
      }
      actions={<SubmitButton>Sign In</SubmitButton>}
      links={
        <BottomLink
          linkText={'Sign Up'}
          text={'Don`t have an account?'}
          url={'/sign-up'}
        />
      }
      error={<ErrorMessage error={right(null)} />}
      onSubmit={hendleSubmit}
    />
  )
}
