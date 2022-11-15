import { useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

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
  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        <span>{blog.likes} likes</span>
        <button onClick={() => dispatch(likeBlog(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user !== null && user.username === blog.user.username && (
        <button onClick={() => handleRemove(blog)}>remove</button>
      )}
      <h3>Comments:</h3>
      <ul>
        {blog.comments.map(cmnt =>
          <li key={cmnt.id}>
            {cmnt.body}
            <em> Added: {cmnt.date}</em>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Blog
