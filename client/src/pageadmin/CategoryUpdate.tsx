import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import AuthUser from '../pageauth/AuthUser'
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
  const token = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    [getToken]
  )

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const reader = new FileReader()
    if (files) {
      reader.readAsDataURL(files[0])
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          setUrlfoto(e.target.result)
        }
      }
    }
  }

  useEffect(() => {
    const getCategoryById = async () => {
      Api.getCategoryById(Number(id), token).then(({ data }) => {
        // console.log(data)
        setNombre(data.nombre)
        setDescripcion(data.description)
        setOrden(data.orden)
        setMenu(data.menu)
        setVerfoto(data.urlfoto)
      })
    }
    getCategoryById()
  }, [id, token])

  const submitUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // console.log({nombre, description, orden, menu, urlfoto});
    await Api.getCategoryUpdate(
      Number(id),
      { nombre, description, orden, menu, urlfoto },
      token
    )
      .then((response) => {
        if (response.status == 200) console.log('Actualizado correctamente')
      })
      .catch((error) => {
        console.log(error)
      })
    navigate('/admin/category')
  }

  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-70">
        <div className="">
          <form action="" onSubmit={submitUpdate}>
            <div className="grid md:grid-cols-3 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <label className="inline-flex items-center mb-5 cursor-pointer">
                  <input
                    checked={menu}
                    onChange={() => setMenu(!menu)}
                    id="menu"
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                  <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Menu
                  </span>
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label htmlFor="order">Order</label>
                <input
                  type="number"
                  name="order"
                  id="order"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => handleInputChange(e)}
              />
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
                Actualizar Categoría
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CategoryUpdate
