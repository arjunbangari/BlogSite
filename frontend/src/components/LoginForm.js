import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import apiService from '../services/blogs'
import { Form, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

const LoginForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault()

        const newObject = {
            username, 
            password
        }

        try{
            const loginResponse = await apiService.loginRequest(newObject)
            apiService.setToken(loginResponse.token)
            dispatch(setUser(loginResponse))
            setUsername('')
            setPassword('')
            history.push("/blogs")
        } catch(err) {
            console.log(err)
            alert('unauthorised')
        }
    }

    return(
        <Form onSubmit={handleLoginSubmit} className="w-50 mx-auto mt-5">
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={username} onChange={handleUsernameChange} />
            </Form.Group>

            <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={handlePasswordChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>

            <Form.Text>
                Create New Account? <Link to="/signup">Sign up</Link>
            </Form.Text>
        </Form>
    )
}

export default LoginForm