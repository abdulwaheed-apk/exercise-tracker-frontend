import axios from 'axios'
import { userEndpoint } from '../../core/endpoints'

// console.log(userEndpoint)

// Register Call
const register = async (userData) => {
  const response = await axios.post(userEndpoint + '/register', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}
// Logout Call
const logout = () => {
  localStorage.removeItem('user')
}
// Login Call
const login = async (userData) => {
  const response = await axios.post(userEndpoint + '/login', userData)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  // console.log('response from server debug -->', response)
  return response.data
}
const updateUser = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(
    userEndpoint + '/profileUpdate',
    userData,
    config
  )
  console.log('response  for updateUser', response)
  return response.data
}

const authService = {
  register,
  logout,
  login,
  updateUser,
}
export default authService
