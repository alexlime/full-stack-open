import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ListGroup from 'react-bootstrap/ListGroup'
import Badge from 'react-bootstrap/Badge'
import Col from 'react-bootstrap/Col'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  return (
    <div>
      <ListGroup as={Col} lg={{ span: 8 }} variant='flush' style={{ marginTop: '20px' }}>
        {blogs.map((blog) => (
          <ListGroup.Item
            key={blog.id}
            className='d-flex justify-content-between align-items-start'>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <Badge pill bg='primary'>
              {blog.user.username}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}

export default BlogList
