import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)

  const visibility = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    addLike({
      id: blog.id,
      likes: (blog.likes += 1),
    })
  }

  const handleRemove = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} ?`)) {
      removeBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      <div className='moreInfo' style={visibility}>
        {blog.url}
        <br />
        <span>likes: {blog.likes}</span>{' '}
        <button onClick={handleLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        {user !== null && user.username === blog.user.username && (
          <button onClick={handleRemove}>remove</button>
        )}
      </div>
    </div>
  )
}

export default Blog
