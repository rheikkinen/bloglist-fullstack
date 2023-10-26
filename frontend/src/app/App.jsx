import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { initializeBlogs } from '../features/blogs/blogSlice'
import { initializeUsers } from '../features/users/userSlice'
import UserList from '../features/users/UserList'
import HomePage from '../components/HomePage'
import LoginForm from '../features/users/LoginForm'
import Notification from '../features/notification/Notification'
import User from '../features/users/User'
import Blog from '../features/blogs/Blog'
import { Container } from '@chakra-ui/react'
import NavBar from '../components/NavBar'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users.loggedInUser)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, []) // eslint-disable-line

  return (
    <div>
      {user !== null && <NavBar />}
      <Container maxW="container.md">
        <Notification />
        {user === null ? (
          <LoginForm />
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
          </div>
        )}
      </Container>
    </div>
  )
}

export default App
