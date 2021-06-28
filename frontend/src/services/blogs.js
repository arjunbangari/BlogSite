import axios from 'axios'
const baseUrl = '/api'

const setToken = newToken => {
    window.localStorage.setItem('token', `bearer ${newToken}`)
}

const removeToken = () => {
    window.localStorage.removeItem('token')
}

const getToken = () => {
    return window.localStorage.getItem('token')
}

const loginRequest = async (credentials) => {
    const response = await axios.post(`${baseUrl}/login`, credentials)
    return response.data
}

const getAll = async () => {
    const response = await axios.get(`${baseUrl}/blogs`)
    return response.data
}

const createBlog = async (newBlog) => {
    const config = {
        headers : {Authorization: getToken()},
    }

    const response = await axios.post(`${baseUrl}/blogs`, newBlog, config)
    return response.data
}

const deleteBlog = async (id) => {
    const config = {
        headers : {Authorization: getToken()},
    }
    const response = await axios.delete(`${baseUrl}/blogs/${id}`, config)
    return response.data
}

const updateBlog = async (newBlog) => {
    const response = await axios.put(`${baseUrl}/blogs/${newBlog.id}`, newBlog)
    return response.data
}

const tmp = {loginRequest, setToken, getAll, removeToken, createBlog, deleteBlog, updateBlog}

export default tmp
