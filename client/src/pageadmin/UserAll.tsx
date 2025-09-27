import { useEffect, useMemo, useState } from 'react'
import Api from '../Api'
// import AuthUser from '../pageauth/AuthUser'
import { Link } from 'react-router'
import { getToken } from '../pageauth/UserSession'

type User = {
  id: string
  name: string
}

const UserAll = () => {
  console.log('in declare UserAll')
  // const { getToken } = AuthUser()
  const [users, setUsers] = useState<User[]>([])
  const token = useMemo(
    () => ({ headers: { Authorization: `Bearer ${getToken()}` } }),
    []
  )
  useEffect(() => {
    console.log('in useEffect')
    const getUserAll = async () => {
      const response = await Api.getUserAll(token)
      console.log(response)
      setUsers(response.data)
    }
    getUserAll()
  }, [token])

  return (
    <div className="p-4 md:ml-56">
      <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
        {/* // */}
        <div className="bg-gray-50 dark:bg-gray-800 overflow-auto mb-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Order
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {!users
                ? '...loading'
                : users.map((user) => {
                    return (
                      <tr
                        key={user.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200"
                      >
                        <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {user.id}
                        </th>
                        <td className="px-6 py-4">{user.name}</td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/admin/user/edit/${user.id}`}
                            className="btn btn-primary"
                          >
                            Edit
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
  )
}

export default UserAll
