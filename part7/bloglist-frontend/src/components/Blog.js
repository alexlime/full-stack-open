import { useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, makeComment } from '../reducers/blogReducer'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

const Comments = ({ blog, addComment }) => {
  return (
    <div>
      <br />

      <Form onSubmit={addComment}>
        <InputGroup className='mb-3'>
          <Form.Control name='comment' placeholder='your comment...' />
          <Button type='submit' variant='primary' id='button-addon2'>
            Submit
          </Button>
        </InputGroup>
      </Form>

      <ListGroup variant='flush'>
        {blog.comments.map((cmnt) => (
          <ListGroup.Item key={cmnt.id}>
            {cmnt.body}
            {/*<em> Added: {cmnt.date}</em>*/}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

const Blog = () => {
  const match = useMatch('/blogs/:id')
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((x) => x.id === match.params.id)
  const user = useSelector((state) => state.login)
  const navigate = useNavigate()

  if (!blog) {
    return null
  }

  const handleRemove = (blog) => {
    dispatch(deleteBlog(user, blog))
    navigate('/')
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(makeComment(event.target.comment.value, blog.id))
    event.target.comment.value = ''
  }

  return (
    <Col lg={{ span: 8 }} style={{ marginTop: '20px' }}>
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            added by {blog.user.name}
          </Card.Subtitle>
          <Card.Link href={blog.url}>{blog.url}</Card.Link>
          <div style={{ marginTop: '20px' }}>
            <Button
              variant='primary'
              size='sm'
              onClick={() => dispatch(likeBlog(blog))}>
              Like{' '}
              <Badge bg='light' text='dark'>
                {blog.likes}
              </Badge>
            </Button>{' '}
            {user !== null && user.username === blog.user.username && (
              <Button
                size='sm'
                variant='danger'
                onClick={() => handleRemove(blog)}>
                remove
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
      <Comments blog={blog} addComment={handleComment} />
    </Col>
  )
}

export default Blog
