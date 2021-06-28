import axios from 'axios'
const baseUrl = '/api/users'

const signupUser = async (user) => {
    const response = await axios.post(baseUrl, user)
    return response.data
}

const util = {signupUser}

export default util