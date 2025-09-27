import axios from 'axios'

// const base_api_url = `${window.location.origin}/api`
const base_api_url = 'http://localhost:3003'

export default {
  //AUTH
  getRegister: (data: object) => axios.post(`${base_api_url}/register`, data),
  getLogin: (data: object) => axios.post(`${base_api_url}/login`, data),
  getLogout: (data: object, token: object) =>
    axios.post(`${base_api_url}/logout`, data, token),

  //ROL ADMIN
  getUserAll: (token: object) => axios.get(`${base_api_url}/user`, token),
  getUserById: (id: number, token: object) =>
    axios.get(`${base_api_url}/user/${id}`, token),
  getUserUpdate: (id: number, data: object, token: object) =>
    axios.put(`${base_api_url}/user/${id}`, data, token),

  //CATEGORY
  getCategoryAll: (token: object) =>
    axios.get(`${base_api_url}/category`, token),
  getCategoryStore: (data: object, token: object) =>
    axios.post(`${base_api_url}/category`, data, token),
  getCategoryById: (id: number, token: object) =>
    axios.get(`${base_api_url}/category/${id}`, token),
  getCategoryUpdate: (id: number, data: object, token: object) =>
    axios.put(`${base_api_url}/category/${id}`, data, token),
  getCategoryDelete: (id: number, token: object) =>
    axios.delete(`${base_api_url}/category/${id}`, token)
}
