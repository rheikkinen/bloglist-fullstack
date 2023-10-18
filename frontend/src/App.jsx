import { useState, useEffect, useRef } from 'react'
import Blog from './features/blogs/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './features/blogs/BlogForm'
import Notification from './features/notification/Notification'
import blogService from './services/blogs'
import ToggleVisibility from './components/ToggleVisibility'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './features/blogs/blogSlice'

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('loggedUserDetails')),
  )
  const [loggedIn, setLoggedIn] = useState(false)
  const blogFormRef = useRef()

  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    if (user) blogService.setToken(user.token)
  }, []) // eslint-disable-line

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUserDetails')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [loggedIn])

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm setUser={setUser} setLoggedIn={setLoggedIn} />
      ) : (
        <div>
          <LogoutButton setUser={setUser} setLoggedIn={setLoggedIn} />
          <p>Logged in as {user.username}</p>
          <ToggleVisibility buttonLabel="Add a new blog" ref={blogFormRef}>
            <BlogForm
              toggleVisibility={() => blogFormRef.current.toggleVisibility()}
            />
          </ToggleVisibility>

          <table>
            <caption style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>
              Blogs
            </caption>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id}>
                  <Blog blog={blog} blogs={blogs} user={user} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default App
