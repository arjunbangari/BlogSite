const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
// const User = require('../models/user')
// const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    return response.json(blogs)
  } catch(err) {
    return next(err)
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      content: body.content,
      author: body.author,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()

    return response.status(201).json(savedBlog)
  } catch(err) {
    return next(err)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  const id = request.params.id
  const user = request.user
  const blogToBeDeleted = await Blog.findById(id)

  // console.log(user.id, blogToBeDeleted)

  try {
    if(blogToBeDeleted.user.toString() !== user.id.toString()){
      return response.status(400).json({ error: 'invalid token' })
    }

    const deletedBlog = await Blog.findByIdAndDelete(id)
    console.log(deletedBlog)
    user.blogs = user.blogs.filter(blogId => blogId!==deletedBlog.id)
    await user.save()
    return response.status(204).json(deletedBlog)
  } catch(err) {
    return next(err)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    content: body.content
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    return response.status(200).json(updatedBlog)
  } catch(err) {
    return next(err)
  }
})

module.exports = blogsRouter