import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ toggleVisibility, createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })

    toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
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
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
