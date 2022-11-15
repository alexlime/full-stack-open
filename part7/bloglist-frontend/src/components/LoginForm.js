import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../reducers/loginReducer'

import { setNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.login)

  // Redirect to main page if user logged in
  // using hook to prevent rendering errors
  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value,
    }

    dispatch(loginUser(credentials)).then(login => {
      if (login.status) {
        dispatch(setNotification(`${login.data.username} is logged in`, 5))
        return navigate('/')
      }
      dispatch(setNotification(login.data.response.data.error, 5))
    })

    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input name='username' placeholder='username...' />
        </div>
        <div>
          password
          <input type='password' name='password' placeholder='password...' />
        </div>
        <button id='login-button' type='submit'>
          login
        </button>
      </form>
    </>
  )
}

export default LoginForm
