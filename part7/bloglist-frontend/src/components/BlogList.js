import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'


const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const visibility = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const handleLike = (blog) => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = (blog) => {
    dispatch(deleteBlog(user, blog))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={visibility}>
        {blog.url}
        <br />
        <span>likes: {blog.likes}</span>{' '}
        <button onClick={ () => handleLike(blog)}>like</button>
        <br />
        {blog.user.name}
        <br />
        {user !== null && user.username === blog.user.username && (
          <button onClick={ () => handleRemove(blog) }>remove</button>
        )}
      </div>
    </div>
  )
}


const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => 
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList