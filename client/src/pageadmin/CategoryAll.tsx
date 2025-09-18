import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import AuthUser from '../pageauth/AuthUser'
import { Link } from 'react-router'
import Api from '../Api'

const CategoryAll = () => {
  const { getToken } = AuthUser()
  const [categories, setCategories] = useState([])
  const token = { headers: { Authorization: `Bearer ${getToken()}` } }

  const getCategoryAll = async () => {
    await Api.getCategoryAll(token)
      .then((response) => {
        // console.log(response)
        if (typeof response.data !== 'string') {
          try {
            const type = Object.prototype.toString.call(response.data)
            if (type === '[object Object]' || type === '[object Array]') {
              setCategories(response.data)
              console.log('Categorías cargadas')
            }
          } catch (err) {
            console.log(err)
          }
        } else console.log('Error, string recibido desde el servidor.')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getCategoryAll()
  }, [])

  const deleteCategoryById = async (id) => {
    const isDelete = window.confirm('Borrar Categoría?')
    if (isDelete) {
      await Api.getCategoryDelete(id, token)
        .then((response) => {
          response.status == 200 ? console.log('Eliminado correctamente') : ''
        })
        .catch((error) => {
          console.log(error)
        })
      getCategoryAll()
    }
  }

  return (
    <div className="container bg-light">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9">
          <div className="card">
            <div className="card-body">
              <Link to={'/admin/category/create'} className="btn btn-primary">
                Agregar categoría
              </Link>
              <table className="table">
                <thead>
                  <tr>
                    <th>Orden</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {!categories
                    ? 'loading...'
                    : categories.map((category) => {
                        return (
                          <tr key={category.id}>
                            <td>{category.orden}</td>
                            <td>{category.nombre}</td>
                            <td>
                              <Link
                                className="btn btn-primary"
                                to={`/admin/category/edit/${category.id}`}
                              >
                                Editar
                              </Link>
                              <button
                                className="btn btn-danger"
                                onClick={() => {
                                  deleteCategoryById(category.id)
                                }}
                              >
                                Eliminar
                              </button>
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

export default CategoryAll
