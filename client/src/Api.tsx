import axios from 'axios'

// const base_api_url = `${window.location.origin}/api`
const base_api_url = 'http://localhost:3003'

export default {
  //AUTH
  getRegister: (data: object) =>
    axios.post(`${base_api_url}/auth/register`, data),
  getLogin: (data: object) => axios.post(`${base_api_url}/auth/login`, data),
  getLogout: (data: object, token: object) =>
    axios.post(`${base_api_url}/auth/logout`, data, token),

  //ROL ADMIN
  getUserAll: (token: object) => axios.get(`${base_api_url}/admin/user`, token),
  getUserById: (id: number, token: object) =>
    axios.get(`${base_api_url}/admin/user/${id}`, token),
  getUserUpdate: (id: number, data: object, token: object) =>
    axios.put(`${base_api_url}/admin/user/${id}`, data, token),

  //CATEGORY
  getCategoryAll: (token: object) =>
    axios.get(`${base_api_url}/admin/category`, token),
  getCategoryStore: (data: object, token: object) =>
    axios.post(`${base_api_url}/admin/category`, data, token),
  getCategoryById: (id: number, token: object) =>
    axios.get(`${base_api_url}/admin/category/${id}`, token),
  getCategoryUpdate: (id: number, data: object, token: object) =>
    axios.put(`${base_api_url}/admin/category/${id}`, data, token),
  getCategoryDelete: (id: number, token: object) =>
    axios.delete(`${base_api_url}/admin/category/${id}`, token)
}
