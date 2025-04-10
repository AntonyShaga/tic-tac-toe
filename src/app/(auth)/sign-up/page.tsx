'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { Alert, AlertDescription } from '@/shared/ui/alert'
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import Link from 'next/link'

export default function SignUp() {
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
    <div
      className={'flex items-center justify-center min-h-screen bg-background'}
    >
      <Card className={'w-full max-w-md'}>
        <CardHeader>
          <CardTitle className={'text-2xl font-bold text-center'}>
            Sign Up
          </CardTitle>
          <CardDescription className={'text-center'}>
            Create your account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={hendleSubmit} className={'space-y-4'}>
            <div className={'space-y-2'}>
              <Label htmlFor={'email'}>Email</Label>
              <Input
                id="email"
                type={'email'}
                placeholder={'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className={'space-y-2'}>
              <Label htmlFor={'password'}>Password</Label>
              <Input
                id="password"
                type={'password'}
                placeholder={'Enter your password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={true}
              />
            </div>
            {error && (
              <Alert variant={'destructive'}>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type={'submit'} className={'w-full'}>
              Sing Up
            </Button>
          </form>
        </CardContent>
        <CardFooter className={'flex justify-center'}>
          <p className={'text-sm text-gray-600'}>
            Already have an account?{'  '}
            <Link
              className={'font-medium text-primary hover:underline'}
              href="/sign-in"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
