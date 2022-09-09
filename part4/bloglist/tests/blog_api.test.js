const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')


// -----------------------------------
// Helpers (to do: put in separate file)
const initialBlogs = [
  {
    title: 'Blog used in tests',
    author: 'Mr. Test ',
    url: 'www.test.com',
    likes: 1,
  },
  {
    title: 'Another blog created for tests',
    author: 'Mrs. Test',
    url: 'www.anothertest.org',
    likes: 2,
  },
]

// Helper, lggin a user
const logInUser = async (username, password) => {
  const user = {
    username: username,
    password: password
  }
  const result = await api
    .post('/api/login')
    .send(user)
  token = `bearer ${result.body.token}`
  return token
}

// Helper, create a user
const createUser = async (username, name, password) => {
  const user = {
    username: username,
    name: name,
    password: password
  }
  const result = await api
    .post('/api/users/')
    .send(user)

  return result
}

// Helper function returns blogs through toJSON()
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

// -----------------------------------
// Tests

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

describe('Testing blog posts', () => {
  test('Blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })


  test('Correct number of blog posts returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })


  test('Blogposts unique identifier property is named id', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })


  test('New blog post can be added', async () => {
    await User.deleteMany({})
    const newUser = await createUser('root', 'Alex Lime', 'sekret')
    const token = await logInUser('root', 'sekret')

    const blogPost = {
      title: 'Testing POST request',
      author: 'AL',
      url: 'www.example.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .set('Authorization', token) // Set the auth header
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(initialBlogs.length + 1)

    const title = blogs.map(n => n.title)
    expect(title).toContain('Testing POST request')
  })

  // ex 4.23*
  test('Adding blog fails if a token is not provided', async () => {
    const blogPost = {
      title: 'Testing POST request',
      author: 'AL',
      url: 'www.example.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })


  test('Missing likes property will be defaulted to 0', async () => {
    await User.deleteMany({})
    const newUser = await createUser('root', 'Alex Lime', 'sekret')
    const token = await logInUser('root', 'sekret')

    const blogPost = {
      title: 'Missing likes peoperty',
      author: 'AL',
      url: 'www.example.com',
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .set('Authorization', token) // Set the auth header
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()
    blogs.forEach(blog => {
      if (blog.title === 'Missing likes peoperty') {
        expect(blog.likes).toBe(0)
      }
    })
  })


  test('Missing title and url properties cause 400 bad request', async () => {
    await User.deleteMany({})
    const newUser = await createUser('root', 'Alex Lime', 'sekret')
    const token = await logInUser('root', 'sekret')

    const blogPost = {
      author: 'AL',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .set('Authorization', token) // Set the auth header
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(initialBlogs.length)
  })


  test('DELETE a blogpost', async () => {
    await User.deleteMany({})
    const newUser = await createUser('root', 'Alex Lime', 'sekret')
    const token = await logInUser('root', 'sekret')

    const blogPost = {
      title: 'Testing DELETE request',
      author: 'AL',
      url: 'www.example.com',
      likes: 0,
    }

    // Create a blog first
    result = await api
      .post('/api/blogs')
      .send(blogPost)
      .set('Authorization', token) // Set the auth header
      .expect(201)

    // Now delete and test
    await api
      .delete(`/api/blogs/${result.body.id}`)
      .set('Authorization', token) // Set the auth header
      .expect(204)

    const blogs = await blogsInDb()
    const titles = blogs.map(blog => blog.title)
    expect(titles).not.toContain(result.body.title)
  })


  test('Blog post can be updated', async () => {
    const blogsBefore = await blogsInDb()
    const blogToUpdate = blogsBefore[0]
    const blogPost = {
      title: 'Updated!',
      author: 'Mr. Test',
      url: 'www.test.com',
      likes: 777,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogPost)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAfter = await blogsInDb()
    const updated = blogsAfter[0]
    expect(updated.title).toContain('Updated!')
    expect(updated.likes).toBe(777)

  })
})


describe('Testing users', () => {
  test('invalid users are not created', async () => {
    await User.deleteMany({})

    const userA = await createUser('root', 'Alex Lime', 'xx')
    expect(userA.status).toBe(400)
    expect(userA.body.error).toBe('INVALID USER: username and password must be at least 3 characters long')

    const userB = await createUser('xx', 'Alex Lime', 'sekret')
    expect(userB.status).toBe(400)
    expect(userB.body.error).toBe('INVALID USER: username and password must be at least 3 characters long')

    const userC = await createUser('', 'Alex Lime', 'sekret')
    expect(userC.status).toBe(400)
    expect(userC.body.error).toBe('INVALID USER: username and password must not be empty')

    const userD = await createUser('root', 'Alex Lime', '')
    expect(userD.status).toBe(400)
    expect(userD.body.error).toBe('INVALID USER: username and password must not be empty')

    const users = await User.find({})
    expect(users.length).toEqual(0)

  })
})

afterAll(() => {
  mongoose.connection.close()
})