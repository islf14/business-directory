// import { useState } from 'react'
import { useNavigate } from 'react-router'

const AuthUser = () => {
  const navigate = useNavigate()

  const getToken = () => {
    console.log('->getToken')
    const tokenString = sessionStorage.getItem('token')
    if (tokenString) {
      const token = JSON.parse(tokenString)
      return token
    } else return ''
  }
  const getUser = () => {
    const userString = sessionStorage.getItem('user')
    if (userString) {
      const user = JSON.parse(userString)
      return user
    } else return ''
  }
  const getRol = () => {
    const rolString = sessionStorage.getItem('rol')
    if (rolString) {
      const rol = JSON.parse(rolString)
      return rol
    } else return ''
  }

  // const [rol, setRol] = useState(getRol())
  // console.log(rol)

  const saveToken = (token: string, user: object, rol: string) => {
    sessionStorage.setItem('token', JSON.stringify(token))
    sessionStorage.setItem('user', JSON.stringify(user))
    sessionStorage.setItem('rol', JSON.stringify(rol.toLowerCase()))

    // setRol(rol)
  }

  const getLogout = () => {
    sessionStorage.clear()
    navigate('/login')
  }

  return {
    setToken: saveToken,
    // token,
    // user,
    // rol,
    getToken,
    getRol,
    getUser,
    getLogout
  }
}

export default AuthUser
