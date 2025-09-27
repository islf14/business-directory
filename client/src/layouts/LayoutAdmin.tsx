import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet, useNavigate } from 'react-router'
import AuthUser from '../pageauth/AuthUser'
import Aside from '../components/Aside'

const LayoutAdmin = () => {
  console.log('declare LayoutAdmin')
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
      <Aside />
      <Outlet />
      <Footer />
    </>
  )
}

export default LayoutAdmin
