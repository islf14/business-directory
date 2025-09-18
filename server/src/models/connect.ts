import { Client } from 'pg'

export async function connectDB() {
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
