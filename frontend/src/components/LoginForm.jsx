import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { setNotificationWithTimeout } from '../features/notification/notificationSlice'
import { useDispatch } from 'react-redux'

const LoginForm = ({ setUser, setLoggedIn, showNotification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUserDetails', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setLoggedIn(true)
      setUsername('')
      setPassword('')
      dispatch(
        setNotificationWithTimeout(
          `Logged in as ${user.username}`,
          'success',
          5,
        ),
      )
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout(exception.response.data.error, 'error', 5),
      )
    }
  }

  return (
    <div>
      <h2>Log in to the Blog List App</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            style={{ marginBottom: '2px' }}
            type="text"
            value={username}
            placeholder="Username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            style={{ marginBottom: '2px' }}
            type="password"
            value={password}
            placeholder="Password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button style={{ marginTop: '5px' }} type="submit">
          Log in
        </button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setLoggedIn: PropTypes.func.isRequired,
}

export default LoginForm
