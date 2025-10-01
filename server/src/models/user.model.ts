import type { DataUpdate, HashAuth } from '../types.js'
import { connectDB } from './connect.js'

export class UserModel {
  //

  static async findAll() {
    const client = await connectDB()
    try {
      const text =
        'SELECT id, name, email, created_at, updated_at FROM public.users ORDER BY id'
      const res = await client.query(text)
      return res.rows
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      console.log(m)
      throw new Error('error findAll: ' + m)
    } finally {
      await client.end()
    }
  }

  //

  static async create({ name, email, hashedPassword }: HashAuth) {
    const client = await connectDB()

    try {
      const text =
        'INSERT INTO public.users(name, email, password, created_at, updated_at)	VALUES ($1, $2, $3, $4, $5) RETURNING *'
      const values = [name, email, hashedPassword, new Date(), new Date()]
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

  //

  static async find({ id }: { id: number }) {
    const client = await connectDB()
    try {
      const text =
        'SELECT id, name, email, created_at, updated_at FROM public.users WHERE id = $1'
      const values = [id]
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

  //

  static async update({ id, field, value }: DataUpdate) {
    const client = await connectDB()
    field = field + ', updated_at = $' + (value.length + 1)
    value.push(new Date())
    try {
      const text = `UPDATE public.users SET ${field} WHERE id = $${
        value.length + 1
      } RETURNING *`
      const values = [...value, id]
      const res = await client.query(text, values)
      return res.rows[0]
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      throw new Error('update error: ' + m)
    } finally {
      await client.end()
    }
  }

  //
}
