import { useState } from 'react'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { useDispatch } from 'react-redux'
import { userLogin } from './userSlice'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await dispatch(userLogin({ username, password }))
      setUsername('')
      setPassword('')
      dispatch(
        setNotificationWithTimeout(`Logged in as ${username}`, 'success', 5),
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

export default LoginForm
