import { createSlice } from '@reduxjs/toolkit'
import blogService from './blogService'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload
      return state
        .map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
        .sort((a, b) => b.likes - a.likes)
    },
    removeBlog: (state, action) => {
      const removedBlog = action.payload
      return state.filter((blog) => blog.id !== removedBlog.id)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog)
    dispatch(removeBlog(blog))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const likedBlog = await blogService.like(blog)
    dispatch(updateBlog(likedBlog))
  }
}

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions
export default blogSlice.reducer
