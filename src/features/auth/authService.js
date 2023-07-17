import axios from 'axios'

// console.log(userEndpoint)

// Register Call
const register = async (userData) => {
    const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/users/register`,
        userData
    )
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    // console.log('Register res ', response.data.errors)
    return response.data
}
// Logout Call
const logout = () => {
    localStorage.removeItem('user')
}
// Login Call
const login = async (userData) => {
    const response = await axios.post(
        `${import.meta.env.VITE_SOME_KEY}/users/login`,
        userData
    )
    if (response.status === 400) {
        return response.data
    }
    localStorage.setItem('user', JSON.stringify(response.data))
    // console.log('response from server debug -->', response)
    return response.data
}
// Update User Call
const updateUser = async (userData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.put(
        `${import.meta.env.VITE_SOME_KEY}/users/profileUpdate`,
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
