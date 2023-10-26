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
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.all.find((user) => user.id === id),
  )

  if (!user) return <div>Loading user data...</div>

  return (
    <Box>
      <Heading p={2}>{user.name}</Heading>
      <Heading p={2} as="h3" size="md">
        Added blogs ({user.blogs.length})
      </Heading>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
            </Tr>
          </Thead>
          <Tbody>
            {user.blogs.map((blog) => (
              <LinkBox as={Tr} key={blog.id}>
                <Td>
                  <LinkOverlay as={Link} to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </LinkOverlay>
                </Td>
                <Td>{blog.author || 'Unknown author'}</Td>
              </LinkBox>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default User
