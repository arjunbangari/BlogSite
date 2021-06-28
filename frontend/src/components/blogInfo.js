import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

const BlogInfo = () => {
    const blogs = useSelector(state => state.blogs)
    const id = useParams().id
    const blog = blogs.find(e => e.id===id)

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
        </div>
    )
}

export default BlogInfo