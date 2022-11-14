import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()
  
  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    dispatch(loginUser(credentials))
    event.target.username.value=''
    event.target.password.value=''
  }


  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input name="username" placeholder="username..." />
      </div>
      <div>
        password
        <input type='password' name="password" placeholder="password..."/>
      </div>
      <button id='login-button' type='submit'>login</button>
    </form>
  )
}



export default LoginForm
