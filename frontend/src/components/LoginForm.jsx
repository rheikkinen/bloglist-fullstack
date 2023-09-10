import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setLoggedIn, setNotification }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async event => {
        event.preventDefault()

        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedUserDetails', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setLoggedIn(true)
            setUsername('')
            setPassword('')
            setNotification({
                message: `Logged in as ${user.username}`,
                type: 'success'
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } catch (exception) {
            setNotification({
                message: exception.response.data.error,
                type: 'error'
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
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
                        placeholder='Username'
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <input
                        style={{ marginBottom: '2px' }}
                        type='password'
                        value={password}
                        placeholder='Password'
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button style={{ marginTop: '5px' }} type="submit">Log in</button>
            </form>
        </div>
    )
}

export default LoginForm