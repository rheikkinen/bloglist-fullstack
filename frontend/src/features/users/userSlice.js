import { createSlice } from '@reduxjs/toolkit'
import loginService from './loginService'
import userService from './userService'
import blogService from '../blogs/blogService'

const userSlice = createSlice({
  name: 'users',
  initialState: {
    all: [],
    loggedInUser: JSON.parse(localStorage.getItem('loggedUserDetails')),
  },
  reducers: {
    setUsers: (state, action) => {
      return { ...state, all: action.payload }
    },
    setLoggedInUser: (state, action) => {
      return { ...state, loggedInUser: action.payload }
    },
    logout: (state, action) => {
      return { ...state, loggedInUser: null }
    },
  },
})

export const initializeUsers = () => {
  return async (dispatch, getState) => {
    const users = await userService.getAll()
    const loggedInUser = getState().users.loggedInUser
    if (loggedInUser) {
      await blogService.setToken(loggedInUser.token)
    }
    dispatch(setUsers(users))
  }
}

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    await blogService.setToken(user.token)
    dispatch(setLoggedInUser(user))
    localStorage.setItem('loggedUserDetails', JSON.stringify(user))
  }
}

export const { setUsers, setLoggedInUser, logout } = userSlice.actions
export default userSlice.reducer
