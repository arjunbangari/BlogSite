import React from 'react'

import LoginForm from './LoginForm'
import BloglistForm from './BloglistForm'
import NavigationBar from './NavigationBar'
import Bloglist from './Bloglist'
import BlogInfo from './blogInfo'
import SignupForm from './SignupForm'
import Myblogs from './Myblogs'
import MyblogInfo from './MyblogInfo'
import EditBlog from './EditBlog'

import {
  Switch, Route, Redirect
} from "react-router-dom"

import { Container } from 'react-bootstrap'
import './../index.css'


const App = () => {

    return (
    <div>
        <NavigationBar />

        <Container>
            <Switch>
                <Route path="/signup">
                    <SignupForm />
                </Route>
                <Route path="/login">
                    <LoginForm />
                </Route>
                <Route path="/blogs/:id">
                    <BlogInfo />
                </Route>
                <Route path="/blogs">
                    <Bloglist />
                </Route>
                <Route path="/create">
                    <BloglistForm />
                </Route>
                <Route path="/myblogs/:id/edit">
                    <EditBlog />
                </Route>
                <Route path="/myblogs/:id">
                    <MyblogInfo />
                </Route>
                <Route path="/myblogs">
                    <Myblogs />
                </Route>
                <Route path="/">
                    <Redirect to="/blogs" /> 
                </Route>
            </Switch> 
        </Container>
    </div>
    )
}

export default App