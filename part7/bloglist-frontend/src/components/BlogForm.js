import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useSelector } from 'react-redux'


const BlogForm = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.login)

  const addBlog = (event) => {
    event.preventDefault()
    const content = {
      title: event.target.title.value,
      author: event.target.name.value,
      url: event.target.url.value
    }
    dispatch(createBlog(user, content))
    event.target.title.value = ''
    event.target.name.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input name="title" placeholder='write blog title here'/>
        </div>
        <div>
          author:
          <input name="name" placeholder='write blog author here' />
        </div>
        <div>
          url:
          <input name="url" placeholder='write blog url here' />
        </div>
        <button id='submit-blog' type='submit'>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
