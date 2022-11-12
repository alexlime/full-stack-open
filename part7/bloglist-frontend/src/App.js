import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

// import Blog from './components/Blog'
import BlogList from './components/BlogList'


import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

// Redux migration imports
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs } from './reducers/blogReducer'



const App = () => {
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)
  // const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()
  
  const dispatch = useDispatch()

  // Initializes blog list
  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch]) 


  // /* Fetch all blogs, sort by number of likes and set the blogs array.
  // Triggered only on the first render. */
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => {
  //     setBlogs(blogs.sort((x, y) => (x.likes < y.likes ? 1 : -1)))
  //   })
  // }, [])

  // /* Re-renders and sorts the blogs array
  //    when setBlogs() method is called (when like button ckicked). */
  // useEffect(() => {
  //   setBlogs(blogs.sort((x, y) => (x.likes < y.likes ? 1 : -1)))
  // }, [blogs])


  // Logs in user if token in localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      // console.log(user)
      dispatch(setNotification(`${user.name} succsessfuly logged in`, 5))
    } catch (exception) {
      console.log(exception.response.data.error)
      dispatch(setNotification(exception.response.data.error, 5))
    }
  }

  // const createBlog = async (blogObject) => {
  //   // hides form after blog is created
  //   blogFormRef.current.toggleVisibility()

  //   try {
  //     const blog = await blogService.create(blogObject)
  //     setBlogs(blogs.concat(blog))
  //     dispatch(setNotification(`a new blog: ${blog.title} is added`, 5))
  //   } catch (exception) {
  //     console.log('BLOG VALIDATION FAILED:', exception)
  //     dispatch(setNotification(`${exception.response.data.error}`, 5))
  //   }
  // }

  // const deleteBlog = async (blogID) => {
  //   console.log(blogID)
  //   try {
  //     await blogService.remove(blogID)
  //     setBlogs(blogs.filter((b) => b.id !== blogID))
  //     dispatch(setNotification('Blog successfully deleted!', 5))
  //   } catch (exception) {
  //     console.log(exception)
  //   }
  // }

  // const addLike = async (blogObject) => {
  //   try {
  //     const updatedBlog = await blogService.update(blogObject.id, blogObject)
  //     // Find and replace liked blog in the blogs array
  //     setBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
  //   } catch (exception) {
  //     console.log(exception)
  //   }
  // }

  return (
    <div>
      <h2>login to app</h2>
      <Notification />
      {user === null ? (
        <LoginForm
          user={user}
          username={username}
          password={password}
          handleUsername={({ target }) => setUsername(target.value)}
          handlePassword={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          {user.name} logged in
          <button
            onClick={() => {
              window.localStorage.clear()
              setUser(null)
            }}
          >
            log out
          </button>
          <Togglable buttonLabel='add new blog' ref={blogFormRef}>
            {/*<BlogForm submitBlog={createBlog} />*/}
            <BlogForm />
          </Togglable>
        </div>
      )}

      <BlogList />

{/*
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          removeBlog={deleteBlog}
          user={user}
        />
      ))}*/}
    </div>
  )
}

export default App
