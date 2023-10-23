import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../features/notification/notificationSlice'
import blogReducer from '../features/blogs/blogSlice'
import userReducer from '../features/users/userSlice'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    user: userReducer,
    notification: notificationReducer,
  },
})

export default store
