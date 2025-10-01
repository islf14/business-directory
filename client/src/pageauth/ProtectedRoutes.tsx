import { Navigate, Outlet } from 'react-router'
import { getToken } from './UserSession'

const ProtectedRoutes = () => {
  if (!getToken()) {
    return <Navigate to={'/login'} />
  }

  return <Outlet />
}

export default ProtectedRoutes
