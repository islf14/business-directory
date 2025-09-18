import * as z from 'zod'

const Register = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6).max(100)
})

const Login = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
  password: z.string().min(6).max(100)
})

export const validateRegister = (data: any) => {
  return Register.parse(data)
}

export const validateLogin = (data: any) => {
  return Login.partial().parse(data)
}
