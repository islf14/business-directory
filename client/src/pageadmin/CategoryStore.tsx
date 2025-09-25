import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import Sidebar from './Sidebar'
import Api from '../Api'
import AuthUser from '../pageauth/AuthUser'

const CategoryStore = () => {
  const { getToken } = AuthUser()
  const [nombre, setNombre] = useState('')
  const [description, setDescripcion] = useState('')
  const [orden, setOrden] = useState('')
  const [urlfoto, setUrlfoto] = useState('')
  const navigate = useNavigate()
  const token = { headers: { Authorization: `Bearer ${getToken()}` } }

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setUrlfoto(e.target.result)
        }
      }
    }
  }

  const submitStore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log({nombre, description, orden, urlfoto});
    await Api.getCategoryStore({ nombre, description, orden, urlfoto }, token)
      .then((response) => {
        if (response.status == 200) console.log('Creado correctamente')
      })
      .catch((error) => {
        console.log(error)
      })
    navigate('/admin/category')
  }
  return (
    <div className="container">
      <div className="row">
        <Sidebar />
        <div className="col-sm-9 mt-3 mb-3">
          <div className="card">
            <div className="card-body">
              <form action="" onSubmit={submitStore}>
                <div className="form-group row">
                  <div className="col-sm-8">
                    <label htmlFor="">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-4">
                    <label htmlFor="Orden">Orden</label>
                    <input
                      type="number"
                      className="form-control"
                      value={orden}
                      onChange={(e) => setOrden(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Descripción</label>
                  <textarea
                    name=""
                    id=""
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescripcion(e.target.value)}
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Imagen:</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="btn-group mt-3">
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
                    Crear Categoría
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

export default CategoryStore
