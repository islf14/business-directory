import { Navigate, Outlet } from 'react-router'
import AuthUser from './AuthUser'

const ProtectedRoutes = () => {
  console.log('declare ProtectedRoutes')
  const { getToken } = AuthUser()
  if (!getToken()) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}

export default ProtectedRoutes
