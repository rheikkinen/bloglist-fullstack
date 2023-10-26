import { Box, Button } from '@chakra-ui/react'
import React, { forwardRef, useImperativeHandle, useState } from 'react'

const ToggleVisibility = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility, // pass toggleVisibility function to parent component
    }
  })

  return (
    <Box mt={4}>
      {visible && props.children}
      <Button
        colorScheme={visible ? 'gray' : 'purple'}
        size="sm"
        width="full"
        mt={2}
        onClick={toggleVisibility}
      >
        {visible ? 'Cancel' : props.buttonLabel}
      </Button>
    </Box>
  )
})

ToggleVisibility.displayName = 'ToggleVisibility'

export default ToggleVisibility
