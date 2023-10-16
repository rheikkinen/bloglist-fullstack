import PropTypes from 'prop-types'

const LikeButton = ({ handleLike }) => {
  return (
    <button
      data-testid="like-button"
      style={{ backgroundColor: 'lightgreen' }}
      onClick={handleLike}
    >
      Like
    </button>
  )
}

LikeButton.propTypes = {
  handleLike: PropTypes.func.isRequired,
}

export default LikeButton
