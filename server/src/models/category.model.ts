import type { CategoryCreate, DataUpdate } from '../types.js'
import { connectDB } from './connect.js'

export class CategoryModel {
  //

  static async findAll() {
    const client = await connectDB()
    try {
      const text = 'SELECT * FROM public.category ORDER BY id'
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

  static async create({ field, nval, value }: CategoryCreate) {
    const client = await connectDB()
    field = field + ', created_at, updated_at'
    nval = nval + ', $' + (value.length + 1) + ', $' + (value.length + 2)
    value.push(new Date(), new Date())

    try {
      const text = `INSERT INTO public.category(${field})	VALUES (${nval})`
      const values = [...value]
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

  static async find({ id }: { id: number }) {
    const client = await connectDB()
    try {
      const text = 'SELECT * FROM public.category WHERE id = $1'
      const values = [id]
      const res = await client.query(text, values)
      return res.rows[0]
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      throw new Error('error searching: ' + m)
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
      const text = `UPDATE public.category SET ${field} WHERE id = $${
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

  static async delete({ id }: { id: number }) {
    const client = await connectDB()
    try {
      const text = 'DELETE FROM public.category WHERE id = $1 RETURNING *'
      const values = [id]
      const res = await client.query(text, values)
      return res.rows[0]
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      throw new Error('delete error: ' + m)
    }
  }
  //
}
