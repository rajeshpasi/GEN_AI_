import axios from 'axios'

const API_URL = axios.create({
    baseURL: 'http://localhost:8000/api/auth',
    withCredentials: true
})

// register user and return the response from the backend, which includes the JWT token and user info
export const register = async (username, email, password) => {
    const response = await API_URL.post('/register', { username, email, password })
    return response.data
}

// login user and return the response from the backend, which includes the JWT token and user info
export const login = async (email, password) => {
    const response = await API_URL.post('/login', { email, password })
    return response.data
}
// Logout user by clearing cookie and blacklisting token
export const logout = async () => {
    const response = await API_URL.get('/logout', {
        withCredentials: true
    })
    return response.data
}

// Get user profile response from the backend, 
export const getProfile = async () => {
    const response = await API_URL.get('/get-profile')
    return response.data
}
