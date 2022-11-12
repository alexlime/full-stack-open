import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const visibility = { display: visible ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (event) => {
    console.log('like')
    // event.preventDefault()
    // addLike({
    //   id: blog.id,
    //   likes: (blog.likes += 1),
    // })
  }

  const handleRemove = (event) => {
    // event.preventDefault()
    // if (window.confirm(`Remove blog ${blog.title} ?`)) {
    //   removeBlog(blog.id)
    // }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  // console.log(blog.user.username)
  // console.log(user)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div style={visibility}>
        {blog.url}
        <br />
        <span>likes: {blog.likes}</span>{' '}
        <button onClick={handleLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        {/*{user !== null && user.username === blog.user.username && (
          <button onClick={handleRemove}>remove</button>
        )}*/}
      </div>
    </div>
  )
}

const BlogList = () => {
  const dispatch = useDispatch()
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