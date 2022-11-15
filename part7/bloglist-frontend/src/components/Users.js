import { useState, useEffect } from 'react'
import userService from '../services/users'

const Users = () => {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [])

  // if (users) {
  //   users.forEach(x => {
  //     console.log(x.username, x.blogs.length)
  //   })
  // }

  if (!users) {
    return <div>No users foud...</div>
  }

  return (
    <div>
      <h2>Users</h2>

      <table>
        <tbody>

          <tr>
            <td>&nbsp;</td>
            <th>blogs created</th>
          </tr>

          {users.map(user =>
          <tr key={user.id}>
            <td key={user.id}>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>)}

        </tbody>
      </table>
    </div>
  )
}

export default Users
