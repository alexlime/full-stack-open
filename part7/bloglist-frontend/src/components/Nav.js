import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUserLocalStorage } from '../reducers/loginReducer'

const Nav = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const padding = {
    padding: 5,
  }

  const logOut = () => {
    window.localStorage.clear()
    dispatch(loginUserLocalStorage())
  }

  return (
    <div className='navigation'>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user ? (
        <em>
          {user.username} logged in
          <button onClick={() => logOut()}>log out</button>
        </em>
      ) : (
        <Link style={padding} to='/login'>login</Link>
      )}
    </div>
  )
}

export default Nav
