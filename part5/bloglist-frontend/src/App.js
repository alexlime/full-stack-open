import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin =  async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
    } catch (exception) {
      console.log(exception.response.data.error)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setBlogTitle('')
      setBlogUrl('')
      setBlogAuthor('')
    } catch (exception) {
      console.log('BLOG CREATE FAILED:', exception)
    }
  }

  return (
    <div>
      <h2>login to app</h2>
      <LoginForm 
        user={user}
        username={username}
        password={password}
        handleUsername={ ({ target }) => setUsername(target.value) }
        handlePassword={ ({ target }) => setPassword(target.value) }
        handleLogin={handleLogin}
        handleLogOut={() => {window.localStorage.clear();setUser(null);}}
      />   

      <BlogForm 
        user={user}
        title={blogTitle}
        author={blogAuthor}
        url={blogUrl}
        handleTitle={ ({target}) => setBlogTitle(target.value) } 
        handleAuthor={ ({target}) => setBlogAuthor(target.value) }
        handleUrl={ ({target}) => setBlogUrl(target.value) }
        submitNewBlog={ addBlog }
      />

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
