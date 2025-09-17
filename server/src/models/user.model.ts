import type { Auth } from '../types.js'
import bcrypt from 'bcrypt'
import { Client } from 'pg'

async function connectDB() {
  const client = new Client()
  try {
    await client.connect()
    return client
  } catch (e: unknown) {
    let m
    if (e instanceof Error) m = e.message
    throw new Error('error connecting: ' + m)
  }
}

export class UserModel {
  //

  static async create({ input }: { input: Auth }) {
    const client = await connectDB()
    const { name, email, password } = input
    console.log(name)
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    try {
      const text =
        'INSERT INTO public.users(name, email, password, approved, created_at, updated_at)	VALUES ( $1, $2, $3, $4, $5, $6) RETURNING *'
      const values = [name, email, hashedPassword, 1, new Date(), new Date()]
      const res = await client.query(text, values)
      return res.rows[0]
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      console.log(m)
      throw new Error('error creating: ' + m)
    } finally {
      await client.end()
    }
  }

  //

  static async findByEmail({ email }: { email: string }) {
    const client = await connectDB()
    try {
      const text = 'SELECT * FROM public.users WHERE email = $1'
      const values = [email]
      const res = await client.query(text, values)
      return res.rows[0]
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      console.log(m)
      throw new Error('error finding: ' + m)
    } finally {
      await client.end()
    }
  }
}
