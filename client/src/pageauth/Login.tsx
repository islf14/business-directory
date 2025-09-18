import { useEffect, useState } from 'react'
import AuthUser from './AuthUser'
import { useNavigate } from 'react-router'
import Api from '../Api'
import axios from 'axios'
import { Link } from 'react-router'

const Login = () => {
  const { setToken, getToken } = AuthUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  // console.log('en inicio login') //cambiar que cada tecla se cambie
  useEffect(() => {
    if (getToken()) {
      navigate('/')
    }
  }, [])

  const submitLogin = async (e) => {
    e.preventDefault()

    await axios.get('/sanctum/csrf-cookie').then((response) => {
      Api.getLogin({ email, password }).then(({ data }) => {
        if (data.success) {
          console.log(data.message)
          console.log(data.token)
          setToken(data.token, data.user, data.user.roles[0].name)
        } else {
          console.log(data.message)
        }
      })
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-7 col-md-6 col-lg-5">
          <div className="card mt-5 mb-5">
            <div className="card-body">
              <h1 className="text-center fw-bolder">Login</h1>
              <input
                type="email"
                id="email"
                className="form-control mt-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
              <input
                type="password"
                id="password"
                className="form-control mt-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                onClick={submitLogin}
                className="btn btn-primary w-100 mt-3"
              >
                ENVIAR
              </button>
              <p className="text-center mt-3">{message}</p>
              <hr />
              <div className="d-grid text-center">
                Por primera vez debe{' '}
                <Link to={'/register'} className="">
                  Registrarse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
