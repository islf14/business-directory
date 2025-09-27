import { connectDB } from './connect.js'

type PermissionUser = {
  user_id: number
  permission_name: string
}

export class RolModel {
  static async roleNameByUserId({ id }: { id: number }) {
    const client = await connectDB()
    try {
      const text =
        'SELECT id, name FROM public.user_has_roles INNER JOIN public.roles ON user_has_roles.role_id = roles.id WHERE user_id = $1'
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

  static async permissionByUserId({
    user_id,
    permission_name
  }: PermissionUser) {
    const client = await connectDB()
    try {
      const text =
        'SELECT user_has_roles.user_id, users.name as user_name, user_has_roles.role_id, roles.name as role_name, role_has_permissions.permission_id, permissions.name as persmission_name FROM public.users INNER JOIN public.user_has_roles ON users.id = user_has_roles.user_id	INNER JOIN public.roles ON user_has_roles.role_id = roles.id	INNER JOIN public.role_has_permissions ON roles.id = role_has_permissions.role_id	INNER JOIN public.permissions ON role_has_permissions.permission_id = permissions.id WHERE users.id = $1 AND permissions.name = $2;'
      const values = [user_id, permission_name]
      const res = await client.query(text, values)
      return res.rows
    } catch (e: unknown) {
      let m
      if (e instanceof Error) m = e.message
      throw new Error('error searching: ' + m)
    } finally {
      await client.end()
    }
  }
}
