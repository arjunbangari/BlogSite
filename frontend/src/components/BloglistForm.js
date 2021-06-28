import React, {useState} from 'react'
import apiService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { createNewBlog } from './../reducers/blogsReducer'
import { createUserBlog } from '../reducers/userReducer'
import { useHistory, Redirect } from 'react-router'
import { Form, Button } from 'react-bootstrap'

const BloglistForm = () => {
    const user = useSelector(state => state.user)

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log(content)

        const newBlog = {
            title, 
            author: user.name,
            content
        }

        try {
            const response = await apiService.createBlog(newBlog)
            dispatch(createNewBlog(response))
            dispatch(createUserBlog(response))
            alert('blog creation successfull')
            history.push("/blogs")
        } catch(err) {
            console.log(err)
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleContentChange = (event) => {
        setContent(event.target.value)
    }

    if(user===null){
        return <Redirect to="/login" />
    }

    return (
        <Form onSubmit={handleSubmit} className="w-50 mx-auto mt-5">
            <Form.Group controlId="blogTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={handleTitleChange}/>
            </Form.Group>
            
            <Form.Group controlId="blogContent">
                <Form.Label>Content</Form.Label>
                <Form.Control as="textarea" rows={3} value={content} onChange={handleContentChange} />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default BloglistForm