import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loginUserLocalStorage } from '../reducers/loginReducer'

// Bootstrap:
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

const Navigation = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const logOut = () => {
    window.localStorage.clear()
    dispatch(loginUserLocalStorage())
  }

  return (
    <Navbar expand='lg' variant='light' bg='light'>
      <Container>
        <Navbar.Brand href='/'>Blogs app</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Blogs
            </Nav.Link>
            <Nav.Link as={Link} to='/users'>
              Users
            </Nav.Link>
          </Nav>
          <Navbar.Text>
            {user ? (
              <>
                Signed in as: {user.username}{' '}
                <Button
                  href='/create'
                  variant='primary'
                  size='sm'
                  style={{ color: 'white' }}>
                  Create new blog
                </Button>{' '}
                <Button
                  variant='outline-primary'
                  size='sm'
                  onClick={() => logOut()}>
                  log out
                </Button>
              </>
            ) : (
              <Nav>
                <Button
                  href='/login'
                  variant='primary'
                  size='sm'
                  style={{ color: 'white' }}>
                  log in
                </Button>
              </Nav>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
