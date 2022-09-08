const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')


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

// Helper function returns blogs through toJSON()
const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

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
    const blogPost = {
      title: 'Testing POST request',
      author: 'AL',
      url: 'www.example.com',
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(initialBlogs.length + 1)

    const title = blogs.map(n => n.title)
    expect(title).toContain('Testing POST request')
  })


  test('Missing likes property will be defaulted to 0', async () => {
    const blogPost = {
      title: 'Missing likes peoperty',
      author: 'AL',
      url: 'www.example.com',
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
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
    const blogPost = {
      author: 'AL',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(blogPost)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogs = await blogsInDb()
    expect(blogs).toHaveLength(initialBlogs.length)
  })

  test('DELETE a blogpost', async () => {
    const blogsBefore = await blogsInDb()
    const blogToDelete = blogsBefore[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfter = await blogsInDb()
    expect(blogsAfter).toHaveLength(initialBlogs.length - 1)
    
    const titles = blogsAfter.map(blog => blog.title)
    expect(titles).not.toContain(blogsAfter.title)

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
    const userA = { 
      username: 'root', 
      name: 'Alex Lime',
      password: 'xx'
    }
    const userB = { 
      username: 'xx', 
      name: 'Alex Lime',
      password: 'sekret'
    }
    const userC = { 
      username: '', 
      name: 'Alex Lime',
      password: 'sekret'
    }
    const userD = { 
      username: 'root', 
      name: 'Alex Lime',
      password: ''
    }
    let result = await api
      .post('/api/users/')
      .send(userA)
      .expect(400)
    expect(result.body.error).toBe('INVALID USER: username and password must be at least 3 characters long')

    result = await api
      .post('/api/users/')
      .send(userB)
      .expect(400)
    expect(result.body.error).toBe('INVALID USER: username and password must be at least 3 characters long')

   result = await api
      .post('/api/users/')
      .send(userC)
      .expect(400)
    expect(result.body.error).toBe('INVALID USER: username and password must not be empty')

   result = await api
      .post('/api/users/')
      .send(userD)
      .expect(400)
    expect(result.body.error).toBe('INVALID USER: username and password must not be empty')

    const users = await User.find({})
    expect(users.length).toEqual(0)
  })
})

afterAll(() => {
  mongoose.connection.close()
})