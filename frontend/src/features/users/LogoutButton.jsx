import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { logout } from './userSlice'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('loggedUserDetails')
    dispatch(logout())
    dispatch(
      setNotificationWithTimeout('Successfully logged out', 'success', 5),
    )
    navigateTo('/')
  }

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  )
}

export default LogoutButton
