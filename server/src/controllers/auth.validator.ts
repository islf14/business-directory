import * as z from 'zod'

const Auth = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6).max(100)
})
export const validateAuth = (data: any) => {
  return Auth.parse(data)
}

export const validatePartialAuth = (data: any) => {
  return Auth.partial().parse(data)
}
