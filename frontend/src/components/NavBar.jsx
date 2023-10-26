import {
  Flex,
  HStack,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import LogoutButton from '../features/users/LogoutButton'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons'

const NavBar = () => {
  const user = useSelector((state) => state.users.loggedInUser)

  return (
    <Flex w="100%" p={4} bgColor="purple.200" alignItems="center">
      <DesktopNav>
        <LinkBox pt={4} pb={4}>
          <LinkOverlay as={Link} to="/">
            Home
          </LinkOverlay>
        </LinkBox>
        <LinkBox pt={4} pb={4}>
          <LinkOverlay as={Link} to="/users">
            Users
          </LinkOverlay>
        </LinkBox>
        <Text>Logged in as {user.name || user.username}</Text>
        <LogoutButton />
      </DesktopNav>

      <MobileNav>
        <LinkBox pl={4} pr={4}>
          <LinkOverlay as={Link} to="/">
            Home
          </LinkOverlay>
        </LinkBox>
        <LinkBox pl={4} pr={4}>
          <LinkOverlay as={Link} to="/users">
            Users
          </LinkOverlay>
        </LinkBox>
        <Text>Logged in as {user.name || user.username}</Text>
        <LogoutButton />
      </MobileNav>
    </Flex>
  )
}

const DesktopNav = ({ children }) => {
  return (
    <Flex
      alignItems="center"
      w="100%"
      display={['none', 'none', 'flex', 'flex']}
    >
      <Heading>Blog List App</Heading>
      <Spacer />
      <HStack as="nav" spacing={10}>
        {children}
      </HStack>
    </Flex>
  )
}

const MobileNav = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Flex w="100%" flexDir="column" display={['flex', 'flex', 'none', 'none']}>
      <Flex w="100%" justify="flex-end">
        {isOpen ? (
          <IconButton mr={2} icon={<CloseIcon />} onClick={onClose} />
        ) : (
          <IconButton mr={2} icon={<HamburgerIcon />} onClick={onOpen} />
        )}
      </Flex>
      <VStack
        alignItems="center"
        spacing={6}
        display={isOpen ? 'flex' : 'none'}
      >
        {children}
      </VStack>
    </Flex>
  )
}

export default NavBar
