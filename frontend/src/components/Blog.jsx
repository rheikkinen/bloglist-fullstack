import { useState } from 'react'
import LikeButton from './LikeButton'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../features/notification/notificationSlice'

const Blog = ({ blog, blogs, setBlogs, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const handleLike = async () => {
    const likedBlog = await blogService.like(blog)
    const updatedBlogs = blogs
      .map((blog) => {
        return blog.id === likedBlog.id ? likedBlog : blog
      })
      .sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog)
        const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
        setBlogs(updatedBlogs)
        dispatch(
          setNotificationWithTimeout(
            `Blog "${blog.title}" by ${blog.author} successfully deleted`,
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
  }

  return (
    <>
      <td>
        <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
          <li>
            {blog.title} <em>{blog.author && 'by ' + blog.author}</em>
          </li>
          {showDetails && (
            <>
              <li>
                <a
                  href={blog.url.includes('//') ? blog.url : `//${blog.url}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {blog.url}
                </a>
              </li>
              <li>{blog.likes} likes</li>
              {blog.user && (
                <li>Added by {blog.user.name || blog.user.username}</li>
              )}
              {user && blog.user && user.username === blog.user.username && (
                <li>
                  <button
                    style={{ backgroundColor: 'lightpink' }}
                    onClick={handleDelete}
                  >
                    Delete blog
                  </button>
                </li>
              )}
            </>
          )}
        </ul>
      </td>
      <td>
        <LikeButton blog={blog} handleLike={handleLike} />
      </td>
      <td>
        <button
          data-testid="showDetailsButton"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
      </td>
    </>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
