// ----------------------------
// CONTROLLERS / BLOGS
// ----------------------------
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Using middleware only for a specific routes
const userExtractor = require('../utils/middleware').userExtractor

// GET: all 
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

// POST: Add new blog
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


// DELETE: a blog with specified id 
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ 
      error: 'Blog post not found' 
    })
  }

  if (user.id.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }
})


// PUT: update a blog post (title and likes)
blogsRouter.put('/:id', async (request, response) => {
  const { title, likes } = request.body

  const updated = await Blog.findByIdAndUpdate(    
    request.params.id, 
    { title, likes },
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(200).json(updated)
})

module.exports = blogsRouter