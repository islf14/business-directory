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

export type DataUpdate = {
  id: number
  field: string
  value: (number | string | Date)[]
}

export type StaticOrigin =
  | boolean
  | string
  | RegExp
  | Array<boolean | string | RegExp>
