import blogService from '../services/blogs'

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

export default LikeButton