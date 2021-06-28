import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import apiService from  '../services/blogs'
import { removeUser } from '../reducers/userReducer'
import { useHistory, Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap'

const NavigationBar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = (event) => {
        event.preventDefault()
        dispatch(removeUser())
        apiService.removeToken('')
        history.push("/login")
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/blogs">BlogSite</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to="/blogs">Home</Nav.Link>
                        <Nav.Link as={Link} to="/create">Create Blog</Nav.Link>
                        {user===null 
                            ?
                            <>
                                <Nav.Link as={Link} to="/signup">Sign up</Nav.Link> 
                                <Nav.Link as={Link} to="/login">Login</Nav.Link> 
                            </>
                            :
                            <>
                                <Nav.Link as={Link} to="/myblogs">My Blogs</Nav.Link> 
                                <NavDropdown title={`${user.username}`} id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to="/blogs" onClick={handleLogout}>logout</NavDropdown.Item>
                                </NavDropdown>
                            </>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar