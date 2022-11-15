import { useMatch } from 'react-router-dom'

const User = ({ users }) => {
  const match = useMatch('/users/:id')

  if (!users) {
    return null
  }

  const user = users.find(user => user.id === match.params.id)

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )

}

export default User