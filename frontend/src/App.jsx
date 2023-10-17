import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './features/notification/Notification'
import blogService from './services/blogs'
import ToggleVisibility from './components/ToggleVisibility'
import { setNotificationWithTimeout } from './features/notification/notificationSlice'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem('loggedUserDetails')),
  )
  const [loggedIn, setLoggedIn] = useState(false)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      setBlogs(blogs)
    })
    if (user) blogService.setToken(user.token)
  }, []) // eslint-disable-line

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUserDetails')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [loggedIn])

  const dispatch = useDispatch()

  const createBlog = async (newBlog) => {
    try {
      const addedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(addedBlog))
      dispatch(
        setNotificationWithTimeout(
          `A new blog "${newBlog.title}" ${
            newBlog.author && 'by ' + newBlog.author
          } successfully added`,
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
      <Notification />
      {user === null ? (
        <LoginForm setUser={setUser} setLoggedIn={setLoggedIn} />
      ) : (
        <div>
          <LogoutButton setUser={setUser} setLoggedIn={setLoggedIn} />
          <p>Logged in as {user.username}</p>
          <ToggleVisibility buttonLabel="Add a new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={createBlog}
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
                  <Blog
                    blog={blog}
                    blogs={blogs}
                    setBlogs={setBlogs}
                    user={user}
                  />
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
