import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../features/notification/notificationSlice'

const LogoutButton = ({ setUser, setLoggedIn, showNotification }) => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUserDetails')
    setUser(null)
    setLoggedIn(false)
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
