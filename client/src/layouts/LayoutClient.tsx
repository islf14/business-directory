import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import AuthUser from '../pageauth/AuthUser'

const LayoutClient = () => {
  const { getRol } = AuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (getRol().toLowerCase() != 'client') {
      navigate('/')
    }
  }, [getRol, navigate])

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutClient
