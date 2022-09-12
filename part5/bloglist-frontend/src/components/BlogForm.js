const BlogForm = ({
  user,
  title,
  author,
  url,
  handleTitle,
  handleAuthor,
  handleUrl,
  submitNewBlog
}) => {
  if (user !== null) {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={submitNewBlog}>
          <div>
            title:
            <input
              value={title}
              onChange={handleTitle}
            />
          </div>
          <div>
            author:
            <input
              value={author}
              onChange={handleAuthor}
            />
          </div>
          <div>
            url:
            <input
              value={url}
              onChange={handleUrl}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  } 

}

export default BlogForm