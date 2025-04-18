import { Label } from '@/shared/ui/label'
import { Input } from '@/shared/ui/input'
import { useId } from 'react'

export function AuthFields() {
  const loginId = useId()
  const passwordId = useId()
  return (
    <>
      <div className={'space-y-2'}>
        <Label htmlFor={loginId}>Login</Label>
        <Input
          id={loginId}
          type={'login'}
          name={'login'}
          placeholder={'Enter your login'}
          required={true}
        />
      </div>
      <div className={'space-y-2'}>
        <Label htmlFor={passwordId}>Password</Label>
        <Input
          id={passwordId}
          type={'password'}
          name={'password'}
          placeholder={'Enter your password'}
          required={true}
        />
      </div>
    </>
  )
}
