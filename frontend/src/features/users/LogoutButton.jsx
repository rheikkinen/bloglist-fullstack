import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { logout } from './userSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

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
      <Button size="sm" colorScheme="purple" onClick={handleLogout}>
        Log out
      </Button>
    </>
  )
}

export default LogoutButton
