const blogsReducer = (state=[], action) => {
    switch (action.type) {
        case 'INIT': 
            return action.data
        case 'CREATE_BLOG':
            return [...state, action.data]
        case 'DELETE_BLOG':
            const newState = state.filter(e => e.id!==action.data)
            return newState
        case 'UPDATE_BLOG':
            return state.map(e => e.id===action.data.id ? action.data : e)
        default:
            return state
    }
}

export const initialiseBlogs = (blogs) => {
    return {
        type: 'INIT',
        data: blogs
    }
}

export const createNewBlog = (blog) => {
    return {
        type: 'CREATE_BLOG',
        data: blog
    }
}

export const deleteBlog = (id) => {
    return {
        type: 'DELETE_BLOG',
        data: id
    }
}

export const updateBlog = (updatedBlog) => {
    return {
        type: 'UPDATE_BLOG',
        data: updatedBlog
    }
}

export default blogsReducer