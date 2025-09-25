import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import Api from '../Api'
import Sidebar from './Sidebar'
import { Link } from 'react-router'
import AuthUser from '../pageauth/AuthUser'

const UserUpdate = () => {
  const navigate = useNavigate()
  const { getToken } = AuthUser()
  const { id } = useParams()
  const [name, setName] = useState('')
  const [aprobado, setAprobado] = useState(false)
  const token = useMemo(
    () => ({
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
    [getToken]
  )

  useEffect(() => {
    const getUserById = async () => {
      Api.getUserById(Number(id), token).then(({ data }) => {
        setName(data.name)
        setAprobado(data.aprobado)
      })
    }
    getUserById()
  }, [id, token])

  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({ aprobado })
    await Api.getUserUpdate(Number(id), { aprobado }, token)
    navigate('/admin/user')
  }

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-header">Editar Usuario</div>
            <div className="card-body">
              <form onSubmit={submitUpdate}>
                <div className="col-sm-12">
                  <label htmlFor="name">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="col-sm-12">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={aprobado}
                      onChange={() => setAprobado(!aprobado)}
                      role="swith"
                      id="menu"
                    />
                    <label htmlFor="aprobado" className="form-check-label">
                      Aprobado
                    </label>
                  </div>
                </div>
                <div className="btn-group">
                  <Link
                    className="btn btn-secondary"
                    to={'..'}
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(-1)
                    }}
                  >
                    Atras
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Actualizar Usuario
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserUpdate
