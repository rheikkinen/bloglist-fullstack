import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const LoginForm = ({ setUser, setLoggedIn }) => {
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
        } catch (error) {
            console.error('Wrong credentials', error)
        }
    }

    return (
        <div>
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