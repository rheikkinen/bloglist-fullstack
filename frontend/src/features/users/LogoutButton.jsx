import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { setUser } from './userSlice'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserDetails')
    dispatch(setUser(null))
    dispatch(
      setNotificationWithTimeout('Successfully logged out', 'success', 5),
    )
  }

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default LogoutButton
