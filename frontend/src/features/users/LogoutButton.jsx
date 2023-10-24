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
    <>
      <button onClick={handleLogout}>Log out</button>
    </>
  )
}

export default LogoutButton
