import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../reducers/loginReducer'

import { setNotification } from '../reducers/notificationReducer'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
    <Col lg={{ span: 8 }} style={{ marginTop: '20px' }}>
      <h2>Login</h2>

      <Form onSubmit={handleLogin}>

        <Form.Group as={Row} className='mb-3' controlId='username' name='username'>
          <Form.Label column sm='2'>username:</Form.Label>
          <Col sm='6'>
            <Form.Control type='text' placeholder='your username...' />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3' controlId='password' name='password'>
          <Form.Label column sm='2'>password:</Form.Label>
          <Col sm='6'>
            <Form.Control type='password' placeholder='your password...' />
          </Col>
        </Form.Group>

        <Button variant='primary' size='sm' type='submit'>
          login
        </Button>
      </Form>
    </Col>
  )
}

export default LoginForm
