export type Auth = {
  name: string
  email: string
  password: string
}

export type HashAuth = {
  name: string
  email: string
  hashedPassword: string
}

export type CategoryCreate = {
  field: string
  nval: string
  value: (number | string | Date)[]
}

export type CategoryUpdate = {
  id: number
  field: string
  value: (number | string | Date)[]
}
