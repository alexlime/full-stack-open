import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'
import Col from 'react-bootstrap/Col'

const Users = ({ users }) => {
  if (!users) {
    return null
  }
  return (
    <Col lg={{ span: 8 }} style={{ marginTop: '20px' }}>
      <h2>Users</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  )
}

export default Users
