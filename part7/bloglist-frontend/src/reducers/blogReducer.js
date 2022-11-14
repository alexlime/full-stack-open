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
    },
    addLike(state, action) {
      const id = action.payload
      state.find(n => n.id === id).likes += 1
      // state.sort((x,y) => y.like - x.likes)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    }

  },
})

export const initialiseBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (user, content) => {
  return async dispatch => {
    try {
      blogService.setToken(user.token)
      const newBlog = await blogService.create(content)
      dispatch(addBlog(newBlog))
      dispatch(setNotification(`a new blog: ${newBlog.title} is added`, 5))
    } catch (exception) {
      console.log('BLOG VALIDATION FAILED:', exception)
      dispatch(setNotification(`${exception.response.data.error}`, 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlogObj = {
      ...blog, likes: blog.likes + 1
    }
    const updatedBlog = await blogService.update(likedBlogObj)
    dispatch(addLike(blog.id)) 
  }
}

export const deleteBlog = (user, blog) => {
  return async dispatch => {
    try {
      blogService.setToken(user.token)
      const delResp = await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id)) 
    } catch (exc) {
      console.log(exc)
    }
  }
}

export const { setBlogs, addBlog, addLike, removeBlog } = blogSlice.actions
export default blogSlice.reducer