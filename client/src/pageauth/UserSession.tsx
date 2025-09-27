export function getToken() {
  console.log('in getToken')
  const tokenString = sessionStorage.getItem('token')
  if (tokenString) {
    const token = JSON.parse(tokenString)
    return token
  } else return ''
}

export function getUser() {
  const userString = sessionStorage.getItem('user')
  if (userString) {
    const user = JSON.parse(userString)
    return user
  } else return ''
}
export function getRol() {
  const rolString = sessionStorage.getItem('rol')
  if (rolString) {
    const rol = JSON.parse(rolString)
    return rol
  } else return ''
}

export function saveToken(token: string, user: object, rol: string) {
  // const navigate = useNavigate()
  sessionStorage.setItem('token', JSON.stringify(token))
  sessionStorage.setItem('user', JSON.stringify(user))
  sessionStorage.setItem('rol', JSON.stringify(rol.toLowerCase()))

  // setToken(token)
  if (getRol() === 'admin') {
    console.log('is admin')
    // navigate('/admin')
  }
  if (getRol() === 'client') {
    console.log('is client')
    // navigate('/client')
  }
  return 'navigate'
}

import { useState } from 'react'

export function useFormInput(initialValue: string) {
  console.log('in form input comp')
  const [value, setValue] = useState(initialValue)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  }

  return inputProps
}
