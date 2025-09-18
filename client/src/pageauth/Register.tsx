import { useEffect, useState } from 'react'
import Api from '../Api'
import { useNavigate } from 'react-router'
import AuthUser from './AuthUser'

const Register = () => {
  const { getToken } = AuthUser()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (getToken()) {
      navigate('/')
    }
  }, [])

  const submitRegistro = async (e) => {
    e.preventDefault()

    Api.getRegister({ name, email, password }).then(({ data }) => {
      if (data.success) {
        navigate('/login')
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-4">
          <div className="card mt-5 mb-5">
            <div className="card-body">
              <h1 className="text-center fw-bolder">Registro</h1>
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                className="form-control mt-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="form-control mt-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                onClick={submitRegistro}
                className="btn btn-primary w-100 mt-3"
              >
                ENVIAR
              </button>
              <p className="text-center">
                <a href="#" className="small text-decoration-none">
                  Términos y condiciones
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
