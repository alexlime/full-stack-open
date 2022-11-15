import { useMatch, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, makeComment } from '../reducers/blogReducer'


const Comments = ({ blog, addComment }) => {
  return (
    <div><br />
      <form onSubmit={addComment}>
        <input name='comment' placeholder='comment...' />
        <button type='submit'>add</button>
      </form>
      <ul>
        {blog.comments.map(cmnt =>
          <li key={cmnt.id}>
            {cmnt.body}
            {/*<em> Added: {cmnt.date}</em>*/}
          </li>
        )}
      </ul>
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
      <Comments
        blog={blog}
        addComment={handleComment}
      />
    </div>
  )
}

export default Blog
