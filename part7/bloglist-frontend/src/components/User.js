import { useMatch } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

const User = ({ users }) => {
  const match = useMatch('/users/:id')

  if (!users) {
    return null
  }

  const user = users.find((user) => user.id === match.params.id)

  return (
    <Col lg={{ span: 8 }} style={{ marginTop: '20px' }}>
      <h2>{user.name}</h2>
      <h4>Added blogs:</h4>
      <ListGroup style={{ marginTop: '20px' }}>
        {user.blogs.map((blog) => (
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  )
}

export default User
