import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import AuthUser from '../pageauth/AuthUser'

const LayoutAdmin = () => {
  const { getRol } = AuthUser()
  const navigate = useNavigate()

  useEffect(() => {
    if (getRol() != 'admin') {
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

export default LayoutAdmin
