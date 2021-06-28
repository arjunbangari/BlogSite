import React, {useState} from 'react'
import apiService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog } from '../reducers/blogsReducer'
import { updateUserBlog } from '../reducers/userReducer'
import { useHistory, Redirect, useParams } from 'react-router'
import { Form, Button } from 'react-bootstrap'

const EditBlog = () => {
    const user = useSelector(state => state.user)
    const id = useParams().id
    const blog = user.blogs.find(e => e.id===id)
    const dispatch = useDispatch()
    const history = useHistory()

    const [title, setTitle] = useState(blog.title)
    const [content, setContent] = useState(blog.content)

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newBlog = {
            ...blog,
            title, 
            content
        }

        try {
            const response = await apiService.updateBlog(newBlog)

            dispatch(updateBlog(response))
            dispatch(updateUserBlog(response))

            alert('blog updated successfully')
            history.push(`/myblogs/${id}`)
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

export default EditBlog