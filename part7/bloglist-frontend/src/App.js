import { useState, useEffect } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Nav from './components/Nav'

import './index.css'

// Redux
import { useDispatch } from 'react-redux'
import { initialiseBlogs } from './reducers/blogReducer'
import { loginUserLocalStorage } from './reducers/loginReducer'

// Router
import { Routes, Route } from 'react-router-dom'

import userService from './services/users'

const App = () => {
  const dispatch = useDispatch()

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
      <Nav />
      <Notification />

      <h2>Blog app</h2>

      <Routes>
        <Route path="/" element={ <BlogList /> } />
        <Route path="/blogs/:id" element={ <Blog /> } />
        <Route path="/login" element={ <LoginForm /> } />
        <Route path="/users" element={ <Users users={users} /> } />
        <Route path="/users/:id" element={ <User users={users} /> } />
      </Routes>
    </div>
  )
}

export default App