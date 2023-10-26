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
import { Link } from 'react-router-dom'

const UserList = () => {
  const users = useSelector((state) => state.users.all)
  return (
    <Box>
      <Heading p={2}>Users</Heading>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="purple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th isNumeric>Blogs created</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <LinkBox as={Tr} key={user.id}>
                <Td>
                  <LinkOverlay as={Link} to={`/users/${user.id}`}>
                    {user.name}
                  </LinkOverlay>
                </Td>
                <Td isNumeric>{user.blogs.length}</Td>
              </LinkBox>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default UserList
