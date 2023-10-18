import { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from './blogSlice'
import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'

const BlogForm = ({ toggleVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await dispatch(createBlog({ title, author, url }))
      dispatch(
        setNotificationWithTimeout(
          `A new blog "${title}" ${
            author && 'by ' + author
          } successfully added`,
          'success',
          5,
        ),
      )
      toggleVisibility()
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log(exception)
      dispatch(
        setNotificationWithTimeout(exception.response.data.error, 'error', 5),
      )
    }
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            style={{ marginBottom: '2px' }}
            type="text"
            value={title}
            placeholder="Title"
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <input
            style={{ marginBottom: '2px' }}
            type="text"
            value={author}
            placeholder="Author"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <input
            style={{ marginBottom: '2px' }}
            type="text"
            value={url}
            placeholder="Url"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button style={{ marginTop: '5px' }} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
}

export default BlogForm
