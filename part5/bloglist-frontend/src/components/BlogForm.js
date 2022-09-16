import { useState } from 'react'

const BlogForm = ({ submitBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitle = (event) => {
    setBlogTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setBlogAuthor(event.target.value)
  }
  const handleUrl = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    submitBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })
    setBlogTitle('')
    setBlogUrl('')
    setBlogAuthor('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={blogTitle}
            onChange={handleTitle}
            placeholder='write blog title here'
          />
        </div>
        <div>
          author:
          <input
            value={blogAuthor}
            onChange={handleAuthor}
            placeholder='write blog author here'
          />
        </div>
        <div>
          url:
          <input
            value={blogUrl}
            onChange={handleUrl}
            placeholder='write blog url here'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}

export default BlogForm