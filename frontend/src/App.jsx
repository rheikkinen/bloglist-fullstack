import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

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

  return (
    <div>
      {user === null
        ? <LoginForm setUser={setUser} setLoggedIn={setLoggedIn} />
        : <div>
          <LogoutButton setUser={setUser} setLoggedIn={setLoggedIn} />
          <p>Logged in as {user.username}</p>
          <h2>Add a new blog</h2>
          <BlogForm blogs={blogs} setBlogs={setBlogs} />
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