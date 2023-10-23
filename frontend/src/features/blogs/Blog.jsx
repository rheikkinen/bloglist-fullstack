import { useState } from 'react'
import LikeButton from '../../components/LikeButton'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { deleteBlog, likeBlog } from './blogSlice'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const handleLike = async () => {
    try {
      await dispatch(likeBlog(blog))
      dispatch(
        setNotificationWithTimeout(
          `Successfully liked the blog "${blog.title}"`,
          'success',
          5,
        ),
      )
    } catch (exception) {
      setNotificationWithTimeout('Something went wrong', 'error', 5)
    }
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
      try {
        await dispatch(deleteBlog(blog))
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
}

export default Blog
