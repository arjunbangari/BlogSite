const userReducer = (state=null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.data
        case 'REMOVE_USER':
            return action.data
        case 'CREATE_USER_BLOG':
            return {...state, blogs: [...state.blogs, action.data]}
        case 'DELETE_USER_BLOG':
            const blogs = state.blogs.filter(blog => blog.id!==action.data)
            return {...state, blogs}
        case 'UPDATE_USER_BLOG':
            const Blogs = state.blogs.map(blog => blog.id===action.data.id ? action.data : blog )
            return {...state, blogs: Blogs}
        default:
            return state
    }
}

export const setUser = (user) => {
    return {
        type: 'SET_USER',
        data: user
    }
}

export const removeUser = () => {
    return {
        type: 'REMOVE_USER',
        data: null
    }
}

export const createUserBlog = (blog) => {
    return {
        type: 'CREATE_USER_BLOG',
        data: blog
    }
}

export const deleteUserBlog = (id) => {
    return {
        type: 'DELETE_USER_BLOG',
        data: id
    }
}

export const updateUserBlog = (updatedBlog) => {
    return {
        type: 'UPDATE_USER_BLOG',
        data: updatedBlog
    }
}

export default userReducer