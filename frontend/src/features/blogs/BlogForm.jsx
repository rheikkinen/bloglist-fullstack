import { useState } from 'react'
import PropTypes from 'prop-types'
import { createBlog } from './blogSlice'
import { useDispatch } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { Box, Button, Heading, Input } from '@chakra-ui/react'
import { logout } from '../users/userSlice'

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
      if (exception.response.data.error === 'Token expired') {
        dispatch(logout())
      }
      dispatch(
        setNotificationWithTimeout(exception.response.data.error, 'error', 5),
      )
    }
  }

  return (
    <div>
      <Box p={2}>
        <Heading as="h3">Add a new blog</Heading>
      </Box>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            value={title}
            placeholder="Title"
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <Input
            mt={2}
            type="text"
            value={author}
            placeholder="Author"
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <Input
            mt={2}
            type="text"
            value={url}
            placeholder="Url"
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button
          colorScheme="purple"
          size="sm"
          mt={4}
          width="full"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
}

export default BlogForm
