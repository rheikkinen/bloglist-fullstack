import { useSelector } from 'react-redux'
import { Alert, AlertIcon, Box } from '@chakra-ui/react'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (notification === null) {
    return null
  } else {
    window.scrollTo(0, 0)
  }

  return (
    <Box mt={4}>
      <Alert status={notification.type}>
        <AlertIcon />
        {notification.message}
      </Alert>
    </Box>
  )
}

export default Notification
