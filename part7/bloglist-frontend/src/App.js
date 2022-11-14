import { useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import './index.css'

// Redux migration imports
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { loginUserLocalStorage } from './reducers/loginReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  // Initializes blog list
  useEffect(() => {
    dispatch(initialiseBlogs())
  }, [dispatch])

  // Logs in user if token is in localstorage
  useEffect(() => {
    dispatch(loginUserLocalStorage())
  }, [])

  return (
    <div>
      <h2>login to app</h2>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          {user.username} logged in
          <button
            onClick={() => {
              window.localStorage.clear()
              dispatch(loginUserLocalStorage())
            }}
          >
            log out
          </button>
          <Togglable buttonLabel='add new blog' ref={blogFormRef}>
            <BlogForm />
          </Togglable>
        </div>
      )}

      <BlogList />
    </div>
  )
}

export default App