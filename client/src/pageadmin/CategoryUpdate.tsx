import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import AuthUser from '../pageauth/AuthUser'
import Sidebar from './Sidebar'
import Api from '../Api'

const CategoryUpdate = () => {
  const navigate = useNavigate()
  const { getToken } = AuthUser()
  const { id } = useParams()
  const [nombre, setNombre] = useState('')
  const [description, setDescripcion] = useState('')
  const [orden, setOrden] = useState('')
  const [menu, setMenu] = useState(false)
  const [verfoto, setVerfoto] = useState('foto.jpg')
  const [urlfoto, setUrlfoto] = useState('')
  const token = { headers: { Authorization: `Bearer ${getToken()}` } }

  const handleInputChange = async (e) => {
    let files = e.target.files
    let reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onload = (e) => {
      setUrlfoto(e.target.result)
    }
  }

  useEffect(() => {
    const getCategoryById = async () => {
      Api.getCategoryById(id, token).then(({ data }) => {
        // console.log(data)
        setNombre(data.nombre)
        setDescripcion(data.description)
        setOrden(data.orden)
        setMenu(data.menu)
        setVerfoto(data.urlfoto)
      })
    }
    getCategoryById()
  }, [])

  const submitUpdate = async (ev) => {
    ev.preventDefault()
    // console.log({nombre, description, orden, menu, urlfoto});
    await Api.getCategoryUpdate(
      id,
      { nombre, description, orden, menu, urlfoto },
      token
    )
      .then((response) => {
        response.status == 200 ? console.log('Actualizado correctamente') : ''
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
              <form action="" onSubmit={submitUpdate}>
                <div className="form-group">
                  <div className="mt-3">
                    <div className="form-check form switch">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={menu}
                        onChange={(e) => setMenu(!menu)}
                        role="switch"
                        id="menu"
                      />
                      <label htmlFor="menu" className="form-check-label">
                        Portada
                      </label>
                    </div>
                  </div>
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
                    <label htmlFor="Orden"></label>
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
                  <img
                    src={'/img/categoria/' + verfoto}
                    alt=""
                    className="img-fluid img-thumbnail"
                  />
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <div className="btn-group">
                  <Link to={-1} className="btn btn-secondary">
                    Atras
                  </Link>
                  <button type="submit" className="btn btn-primary">
                    Actualizar Categoría
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

export default CategoryUpdate
