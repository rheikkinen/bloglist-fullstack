import { useSelector } from 'react-redux'
import BlogForm from '../features/blogs/BlogForm'
import ToggleVisibility from './ToggleVisibility'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Heading,
  LinkBox,
  LinkOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'

const HomePage = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <ToggleVisibility buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </ToggleVisibility>

      <Box mt={4}>
        <Heading p={2}>Blogs</Heading>
        <TableContainer>
          <Table size="sm" variant="striped" colorScheme="purple">
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Author</Th>
                <Th isNumeric>Likes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {blogs.map((blog) => (
                <LinkBox as={Tr} key={blog.id}>
                  <Td>
                    <LinkOverlay as={Link} to={`/blogs/${blog.id}`}>
                      {blog.title}
                    </LinkOverlay>
                  </Td>
                  <Td>{blog.author || 'Unknown author'}</Td>
                  <Td isNumeric>{blog.likes}</Td>
                </LinkBox>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default HomePage
