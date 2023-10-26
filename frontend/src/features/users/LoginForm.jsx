import { useState } from 'react'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { useDispatch } from 'react-redux'
import { userLogin } from './userSlice'
import { Box, Button, Heading, Input } from '@chakra-ui/react'

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
      <Box textAlign="center" p={5}>
        <Heading>Log in to the Blog List App</Heading>
      </Box>
      <form onSubmit={handleLogin}>
        <div>
          <Input
            variant="outline"
            type="text"
            value={username}
            placeholder="Username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <Input
            mt={2}
            variant="outline"
            type="password"
            value={password}
            placeholder="Password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button
          colorScheme="purple"
          variant="solid"
          width="full"
          mt={4}
          type="submit"
        >
          Log in
        </Button>
      </form>
    </div>
  )
}

export default LoginForm
