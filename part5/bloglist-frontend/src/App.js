import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

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


  const showNotification = (text, notificationType, seconds) => {
    setMessageClass(notificationType)
    setMessage(text) 
    setTimeout(() => {
      setMessage(null) 
    }, seconds * 1000)
  }

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
      console.log(user)
      showNotification(`${user.name} succsessfuly logged in`, 'success', 5)
    } catch (exception) {
      console.log(exception.response.data.error)
      showNotification(exception.response.data.error, 'error', 5)
    }
  }

  const createBlog = async (blogObject) => {
    // hides form after blog is created
    blogFormRef.current.toggleVisibility() 

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      showNotification(`a new ${blog.title} added`, 'success', 5)
    } catch (exception) {
      console.log('BLOG VALIDATION FAILED:', exception)
      showNotification(`${exception.response.data.error}`, 'error', 5)
    }
  }

  const addLike = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      // Find and replace liked blog in the blogs array
      setBlogs(blogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>login to app</h2>

      <Notification 
        message={message} 
        messageClass={messageClass} 
      />

      {user === null ?
        <LoginForm 
          user={user}
          username={username}
          password={password}
          handleUsername={ ({ target }) => setUsername(target.value) }
          handlePassword={ ({ target }) => setPassword(target.value) }
          handleLogin={handleLogin}
        /> 
        :
        <div>
          {user.name} logged in
          <button onClick={() => {window.localStorage.clear();setUser(null);}}>log out</button>
          <Togglable buttonLabel="add new blog" ref={blogFormRef}>
            <BlogForm submitBlog={createBlog} />
          </Togglable>
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      )}
    </div>
  )
}

export default App
