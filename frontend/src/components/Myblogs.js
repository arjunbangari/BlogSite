import React from 'react'
import { useSelector} from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
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
                <Button variant="link"><Link to={`/myblogs/${blog.id}`}>Read More</Link></Button>
            </Card.Body>
        </Card>
    )
}

const Myblogs = () => {
    const user = useSelector(state => state.user)

    if(user===null){
        return <Redirect to="/login" />
    }
    
    const blogsToShow = user.blogs.map((blog, i) => <DisplayBlog key={i} blog={blog} />)

    return (
        <div>
            <ul>
                {blogsToShow}
            </ul>
        </div>
    )
}

export default Myblogs
