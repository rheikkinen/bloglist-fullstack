import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
})

export const setNotificationWithTimeout = (
  message,
  type,
  timeout, // timeout in seconds
) => {
  return (dispatch) => {
    dispatch(setNotification({ message: message, type: type }))
    setTimeout(() => dispatch(clearNotification()), timeout * 1000)
  }
}

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
