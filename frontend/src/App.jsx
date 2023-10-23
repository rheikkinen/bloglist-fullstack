import { useEffect, useRef } from 'react'
import Blog from './features/blogs/Blog'
import LoginForm from './features/users/LoginForm'
import LogoutButton from './features/users/LogoutButton'
import BlogForm from './features/blogs/BlogForm'
import Notification from './features/notification/Notification'
import blogService from './services/blogs'
import ToggleVisibility from './components/ToggleVisibility'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './features/blogs/blogSlice'

const App = () => {
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    if (user) blogService.setToken(user.token)
  }, []) // eslint-disable-line

  return (
    <div>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <LogoutButton />
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
                  <Blog blog={blog} />
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
