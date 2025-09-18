import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import Api from '../Api'
import AuthUser from '../pageauth/AuthUser'
import { Link } from 'react-router'

const UserAll = () => {
  const { getToken } = AuthUser()
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUserAll()
  }, [])

  const getUserAll = async () => {
    const token = { headers: { Authorization: `Bearer ${getToken()}` } }
    console.log(token)
    const response = await Api.getUserAll(token)
    setUsers(response.data)
    // console.log(response)
  }

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {!users
                    ? '...loading'
                    : users.map((user) => {
                        return (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>
                              <Link
                                to={`/admin/user/edit/${user.id}`}
                                className="btn btn-primary"
                              >
                                Editar
                              </Link>
                            </td>
                          </tr>
                        )
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserAll
