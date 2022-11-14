import { useState, useEffect, useRef } from 'react'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

// import Blog from './components/Blog'
import BlogList from './components/BlogList'


// import blogService from './services/blogs'
// import loginService from './services/login'
import './index.css'

// Redux migration imports
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initialiseBlogs } from './reducers/blogReducer'
import { loginUserLocalStorage } from './reducers/loginReducer'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

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
        <div> {user.username} logged in 
        <button onClick={() => {
            window.localStorage.clear()
            dispatch(loginUserLocalStorage())
        }}>log out</button>
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

  // const handleLogin = async (event) => {
  //   event.preventDefault()
  //   try {
  //     const user = await loginService.login({
  //       username,
  //       password,
  //     })
  //     blogService.setToken(user.token)
  //     setUser(user)
  //     setUsername('')
  //     setPassword('')
  //     window.localStorage.setItem('loggedUser', JSON.stringify(user))
  //     // console.log(user)
  //     dispatch(setNotification(`${user.name} succsessfuly logged in`, 5))
  //   } catch (exception) {
  //     console.log(exception.response.data.error)
  //     dispatch(setNotification(exception.response.data.error, 5))
  //   }
  // }

// {user === null ? (
//   <LoginForm
//     user={user}
//     username={username}
//     password={password}
//     handleUsername={({ target }) => setUsername(target.value)}
//     handlePassword={({ target }) => setPassword(target.value)}
//     handleLogin={handleLogin}
//   />
// ) : (
//   <div>
//     {user.name} logged in
//     <button
//       onClick={() => {
//         window.localStorage.clear()
//         setUser(null)
//       }}
//     >
//       log out
//     </button>
//     <Togglable buttonLabel='add new blog' ref={blogFormRef}>
//       {/*<BlogForm submitBlog={createBlog} />*/}
//       <BlogForm />
//     </Togglable>
//   </div>
// )}