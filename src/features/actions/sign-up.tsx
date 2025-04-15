import { left } from '@/shared/lib/either'

export const signUpActions = async (state: unknown, formData: FormData) => {
  console.log(formData.get('login'))
  console.log(formData.get('password'))
  return left('login-allredy-taken' as const)
}
