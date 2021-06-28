import React, { useEffect} from 'react'
import apiService from '../services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initialiseBlogs } from './../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { Card, Button } from 'react-bootstrap'

const DisplayBlog = ({blog}) => {
    const blogContentToShow = blog.content.slice(0, 400).concat("...")

    return (
        <Card className="w-75 mx-auto mt-5" border={'dark'}>
            <Card.Header>{blog.author}</Card.Header>
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>
                {blogContentToShow}
                </Card.Text>
                <Button variant="link"><Link to={`/blogs/${blog.id}`}>Read More</Link></Button>
            </Card.Body>
        </Card>
    )
}

const Bloglist = () => {
    const blogs = useSelector(state => state.blogs)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchdata = async () => {
            const response = await apiService.getAll()
            dispatch(initialiseBlogs(response))
        }
        fetchdata()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toShowBlogs = blogs.map((blog, i) => <DisplayBlog key={i} blog={blog} />)

    return (
        <div>
            <h1 className="text-center">Blog List</h1>
            <ul>
                {toShowBlogs}
            </ul>
        </div>
    )
}

export default Bloglist