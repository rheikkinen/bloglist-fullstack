import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import ToggleVisibility from './components/ToggleVisibility'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUserDetails')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
    }
  }, [loggedIn])

  const showNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  return (
    <div>
      <Notification notification={notification} />
      {user === null
        ? <LoginForm
          setUser={setUser}
          setLoggedIn={setLoggedIn}
          setNotification={setNotification}
        />
        : <div>
          <LogoutButton
            setUser={setUser}
            setLoggedIn={setLoggedIn}
            setNotification={setNotification}
          />
          <p>Logged in as {user.username}</p>
          <ToggleVisibility
            buttonLabel='Add a new blog'
            ref={blogFormRef}
          >
            <BlogForm
              blogs={blogs}
              setBlogs={setBlogs}
              showNotification={showNotification}
              toggleVisibility={() => blogFormRef.current.toggleVisibility()}
            />
          </ToggleVisibility>

          <h2>Blogs</h2>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </div>
      }
    </div >
  )
}


export default App