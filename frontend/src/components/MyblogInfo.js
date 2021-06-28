import React from 'react'
import apiService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog } from './../reducers/blogsReducer'
import { deleteUserBlog } from '../reducers/userReducer'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const MyblogInfo = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const id = useParams().id
    const blog = user.blogs.find(e => e.id===id)
    const history = useHistory()

    const handleDeleteClick = async () => {
        try {
            await apiService.deleteBlog(id)
            dispatch(deleteBlog(id))
            dispatch(deleteUserBlog(id))
            history.push('/myblogs')
        } catch(error) {
            console.log(error)
        }
    }

    const style = {
        whiteSpace: 'pre-line'
    }

    if(!blog){
        return null
    }

    return (
        <div className="w-75 mx-auto mt-5">
            <h1 className="text-center">{blog.title}</h1>
            <h5 className="text-right font-italic">- {blog.author}</h5>
            <p style={style}>{blog.content}</p>

            <Button variant="outline-dark" ><Link to={`/myblogs/${id}/edit`}>Edit</Link></Button>
            <Button variant="outline-dark" className="ml-2" onClick={handleDeleteClick}>Delete</Button>
            
        </div>
    )
}

export default MyblogInfo