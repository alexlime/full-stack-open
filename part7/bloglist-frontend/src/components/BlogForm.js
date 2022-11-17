import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const navigate = useNavigate()
  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.name.value,
      url: event.target.url.value,
    }
    dispatch(createBlog(user, content))
    navigate('/')
    event.target.title.value = ''
    event.target.name.value = ''
    event.target.url.value = ''
  }

  return (
    <Col lg={{ span: 8 }} style={{ marginTop: '20px' }}>
      <h2>Create new blog:</h2>
      <Form onSubmit={addBlog}>
        <Form.Group as={Row} className='mb-3' controlId='title' name='title'>
          <Form.Label column sm='2'>
            Blog title:
          </Form.Label>
          <Col sm='10'>
            <Form.Control type='text' placeholder='Enter blog title' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='name' name='name'>
          <Form.Label column sm='2'>
            Author:
          </Form.Label>
          <Col sm='10'>
            <Form.Control type='text' placeholder='Enter author name' />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3' controlId='url' name='url'>
          <Form.Label column sm='2'>
            Url:
          </Form.Label>
          <Col sm='10'>
            <Form.Control type='text' placeholder='Enter url' />
          </Col>
        </Form.Group>
        <Button variant='primary' size='sm' type='submit'>
          Submit
        </Button>
      </Form>
    </Col>
  )
}

export default BlogForm
