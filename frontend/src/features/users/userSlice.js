import { createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'
import blogService from '../../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(localStorage.getItem('loggedUserDetails')),
  reducers: {
    setUser: (state, action) => action.payload,
  },
})

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    await blogService.setToken(user.token)
    dispatch(setUser(user))
    localStorage.setItem('loggedUserDetails', JSON.stringify(user))
  }
}

export const { setUser } = userSlice.actions
export default userSlice.reducer
