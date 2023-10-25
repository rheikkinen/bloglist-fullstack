import LikeButton from '../../components/LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { commentBlog, deleteBlog, likeBlog } from './blogSlice'
import { useNavigate, useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id),
  )
  const user = useSelector((state) => state.users.loggedInUser)

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
        navigateTo('/')
      } catch (exception) {
        dispatch(
          setNotificationWithTimeout(exception.response.data.error, 'error', 5),
        )
      }
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const comment = event.target.comment.value
      await dispatch(commentBlog(blog, comment))
      event.target.comment.value = ''
      dispatch(
        setNotificationWithTimeout('Comment successfully added!', 'success', 5),
      )
    } catch (exception) {
      dispatch(
        setNotificationWithTimeout(exception.response.data.error, 'error', 5),
      )
    }
  }

  if (!blog) return <div>Loading blog data...</div>

  return (
    <>
      <h2>
        {blog.title} (<em>{blog.author && 'by ' + blog.author}</em>){' '}
        {user && blog.user && user.username === blog.user.username && (
          <button
            style={{ backgroundColor: 'lightpink' }}
            onClick={handleDelete}
          >
            Delete blog
          </button>
        )}
      </h2>
      <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
        <li>
          <a
            href={blog.url.includes('//') ? blog.url : `//${blog.url}`}
            target="_blank"
            rel="noreferrer"
          >
            {blog.url}
          </a>
        </li>
        <li>
          {blog.likes} likes <LikeButton handleLike={handleLike} />
        </li>
        {blog.user && <li>Added by {blog.user.name || blog.user.username}</li>}
      </ul>
      <h3>Comments</h3>
      <h4>Add a comment</h4>
      <form onSubmit={handleComment}>
        <input type="textarea" name="comment" />
        <button type="submit">Send</button>
      </form>
      {blog.comments.length > 0 ? (
        <table>
          <tbody>
            {blog.comments.map((comment) => (
              <tr key={comment}>
                <td>{comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No one has commented on this blog yet.</p>
      )}
    </>
  )
}

export default Blog
