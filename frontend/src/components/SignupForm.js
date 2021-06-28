import React, {useState} from 'react'
import apiService from '../services/users'
import { useHistory, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SignupForm = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    
    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSignupSubmit = async (event) => {
        event.preventDefault()

        const newObject = {
            name,
            username, 
            password
        }

        try{
            await apiService.signupUser(newObject)
            alert("Successfully signed up")
            setName('')
            setUsername('')
            setPassword('')
            history.push("/login")
        } catch(err) {
            console.log(err)
            alert('username already exist')
        }
    }

    return(
        <Form onSubmit={handleSignupSubmit} className="w-50 mx-auto mt-5">
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={handleNameChange} />
            </Form.Group>

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
                Already have an account? <Link to="/login">Sign in</Link>
            </Form.Text>
        </Form>
    )
}

export default SignupForm