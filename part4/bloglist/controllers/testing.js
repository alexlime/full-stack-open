const testingRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Route used for testing, clears the testing database
testingRouter.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = testingRouter