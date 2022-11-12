import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    }
  },
})

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(content)
      dispatch(addBlog(newBlog))
      dispatch(setNotification(`a new blog: ${newBlog.title} is added`, 5))
    } catch (exception) {
      console.log('BLOG VALIDATION FAILED:', exception)
      dispatch(setNotification(`${exception.response.data.error}`, 5))
    }
  }
}

export const { setBlogs, addBlog } = blogSlice.actions
export default blogSlice.reducer