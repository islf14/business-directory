import AuthUser from '../pageauth/AuthUser'
import Api from '../Api'
import { Link } from 'react-router'

const Navbar = () => {
  const { getToken, getRol, getLogout } = AuthUser()
  const token = { headers: { Authorization: `Bearer ${getToken()}` } }
  const logoutUser = () => {
    Api.getLogout({}, token)
      .then((response) => {
        console.log(response.data.message)
        getLogout()
      })
      .catch((error) => {
        console.log(error)
        // getLogout() //usar cuando se solo se  cierra sesión en el servidor
      })
  }

  const renderLinks = () => {
    if (getToken()) {
      return (
        <>
          <li className="nav-item">
            <Link to={`/${getRol()}`} className={'nav-link'}>
              Administración
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={logoutUser}>
              Logout
            </a>
          </li>
        </>
      )
    } else {
      return (
        <>
          <li className="nav-item">
            <Link to={'/login'} className="nav-link">
              Login
            </Link>
          </li>
        </>
      )
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          DIREMP
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link to={`/`} className={'nav-link active'}>
                Inicio
              </Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="/admin/category">Categoría</a>
            </li> */}
          </ul>
          <ul className="navbar-nav ms-auto">{renderLinks()}</ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
