// ----------------------------
// CONTROLLERS / BLOGS
// ----------------------------
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

// Using middleware only for a specific routes
const userExtractor = require('../utils/middleware').userExtractor

// GET: all 
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate({
      path: 'comments',
      select: ['body', 'date'],
      options : {
        sort: {'date': -1}
      }
    })
  // console.log(blogs[0].comments)
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

  // populate blog object with user data (for correct render)
  const savedPopulatedBlog = await savedBlog.populate('user', { username: 1, name: 1 })
  
  user.blogs = user.blogs.concat(savedPopulatedBlog._id)
  await user.save()

  response.status(201).json(savedPopulatedBlog)
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
  
  // Populate object returned in response with user data (for correct render)
  const updatedPopulated = await updated.populate('user', { username: 1, name: 1 })
  
  response.status(200).json(updatedPopulated)
})


// COMMENTS
blogsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request.body
  const blog = await Blog.findById(request.params.id)

  const newComment = new Comment({
    body,
    blogID: blog._id
  })

  const savedComment = await newComment.save()

  blog.comments = blog.comments.concat(savedComment._id)
  await blog.save()

  response.status(201).json(savedComment)
})



module.exports = blogsRouter