import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'

import './index.css'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { loginUserLocalStorage } from './reducers/loginReducer'

// Router
import { Routes, Route } from 'react-router-dom'

import userService from './services/users'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  // Initialising users state (could also use redux store)
  const [users, setUsers] = useState(null)
  useEffect(() => {
    userService.getAll().then((users) => {
      setUsers(users)
    })
  }, [])

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
      <Routes>
        <Route path="/" element={ <BlogList /> } />
        <Route path="/users" element={ <Users users={users} /> } />
        <Route path="/users/:id" element={ <User users={users} /> } />
      </Routes>
    </div>
  )
}

export default App