import LikeButton from '../../components/LikeButton'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationWithTimeout } from '../notification/notificationSlice'
import { commentBlog, deleteBlog, likeBlog } from './blogSlice'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import { ChevronRightIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import { logout } from '../users/userSlice'

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
        if (exception.response.data.error === 'Token expired') {
          dispatch(logout())
        }
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
      if (exception.response.data.error === 'Token expired') {
        dispatch(logout())
      }
      dispatch(
        setNotificationWithTimeout(exception.response.data.error, 'error', 5),
      )
    }
  }

  if (!blog) return <div>Loading blog data...</div>

  return (
    <>
      <Stack direction="row">
        <Box>
          <Heading p={2} as="h2">
            {blog.title}
          </Heading>
        </Box>
        {user && blog.user && user.username === blog.user.username && (
          <Center>
            <Box>
              <Button size="xs" colorScheme="red" onClick={handleDelete}>
                Delete blog
              </Button>
            </Box>
          </Center>
        )}
      </Stack>
      <Stack>
        <Card size="sm">
          <CardBody>
            <Link
              isExternal
              href={blog.url.includes('//') ? blog.url : `//${blog.url}`}
            >
              {blog.url} <ExternalLinkIcon />
            </Link>
          </CardBody>
        </Card>
        <Card size="sm">
          <CardBody>
            {blog.likes} likes <LikeButton handleLike={handleLike} />
          </CardBody>
        </Card>
        {blog.user && (
          <Card size="sm">
            <CardBody>Added by {blog.user.name || blog.user.username}</CardBody>
          </Card>
        )}
      </Stack>

      <Box p={2}>
        <Heading as="h3">Comments</Heading>
      </Box>
      <form onSubmit={handleComment}>
        <FormControl>
          <Input
            placeholder="Add a comment"
            variant="outline"
            type="textarea"
            name="comment"
          />
        </FormControl>

        <Button
          width="full"
          size="sm"
          mt={2}
          colorScheme="purple"
          type="submit"
        >
          Send
        </Button>
      </form>
      {blog.comments.length > 0 ? (
        blog.comments.map((comment) => (
          <Card size="sm" key={comment}>
            <CardBody>
              <Text>
                <ChevronRightIcon /> {comment}
              </Text>
            </CardBody>
          </Card>
        ))
      ) : (
        <Text textAlign="center" p={4}>
          No one has commented on this blog yet.
        </Text>
      )}
    </>
  )
}

export default Blog
