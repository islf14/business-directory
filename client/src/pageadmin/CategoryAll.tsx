import { useCallback, useEffect, useMemo, useState } from 'react'
import AuthUser from '../pageauth/AuthUser'
import { Link } from 'react-router'
import Api from '../Api'

type Category = {
  id: number
  name: string
  ord: number
}

const CategoryAll = () => {
  console.log('in declare CategoryAll')
  const { getToken } = AuthUser()
  const [categories, setCategories] = useState<Category[]>([])
  const token = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    [getToken]
  )

  const getCategoryAll = useCallback(async () => {
    await Api.getCategoryAll(token)
      .then((response) => {
        console.log(response)
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
  }, [token])

  useEffect(() => {
    console.log('in useEffect')
    getCategoryAll()
  }, [getCategoryAll])

  const deleteCategoryById = async (id: number) => {
    const isDelete = window.confirm('Borrar Categoría?')
    if (isDelete) {
      await Api.getCategoryDelete(id, token)
        .then((response) => {
          console.log(response)
          if (response.status == 200) console.log('Eliminado correctamente')
        })
        .catch((error) => {
          console.log(error)
        })
      getCategoryAll()
    }
  }

  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-800 overflow-auto mb-4">
          <Link to={'/admin/category/create'} className="btn btn-primary">
            Add Category
          </Link>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead>
              <tr>
                <th>Order</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {!categories
                ? 'loading...'
                : categories.map((category) => {
                    return (
                      <tr key={category.id}>
                        <td>{category.ord}</td>
                        <td>{category.name}</td>
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
  )
}

export default CategoryAll
