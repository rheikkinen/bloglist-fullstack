import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import { initializeBlogs } from '../features/blogs/blogSlice'
import { initializeUsers } from '../features/users/userSlice'
import UserList from '../features/users/UserList'
import HomePage from '../components/HomePage'
import LoginForm from '../features/users/LoginForm'
import LogoutButton from '../features/users/LogoutButton'
import Notification from '../features/notification/Notification'
import User from '../features/users/User'
import Blog from '../features/blogs/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.loggedInUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, []) // eslint-disable-line

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <nav>
            <Link style={{ marginRight: 10 }} to="/">
              Home
            </Link>
            <Link to="/users">Users</Link>
          </nav>
          <p>
            Logged in as {user.username} <LogoutButton />
          </p>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
