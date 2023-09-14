import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LikeButton = ({ blog, updateBlogs }) => {

  const handleLike = async () => {
    const likedBlog = await blogService.like(blog)
    updateBlogs(likedBlog)
  }

  return (
    <button style={{ backgroundColor: 'lightgreen' }} onClick={handleLike}>
            Like
    </button>
  )
}

LikeButton.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlogs: PropTypes.func.isRequired
}

export default LikeButton