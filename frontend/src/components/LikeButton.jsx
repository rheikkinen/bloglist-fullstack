import { Button } from '@chakra-ui/react'
import PropTypes from 'prop-types'

const LikeButton = ({ handleLike }) => {
  return (
    <Button
      size="xs"
      colorScheme="green"
      data-testid="like-button"
      onClick={handleLike}
    >
      Like
    </Button>
  )
}

LikeButton.propTypes = {
  handleLike: PropTypes.func.isRequired,
}

export default LikeButton
