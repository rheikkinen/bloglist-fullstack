import { useState } from 'react'
import LikeButton from './LikeButton'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs, showNotification, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const updateBlogs = async (likedBlog) => {
    const updatedBlogs = blogs
      .map(blog => {
        return blog.id === likedBlog.id
          ? likedBlog
          : blog
      })
      .sort((a, b) => b.likes - a.likes)
    setBlogs(updatedBlogs)
  }

  const handleDelete = async event => {
    event.preventDefault()
    if (window.confirm(`Delete "${blog.title}" by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blog)
        const updatedBlogs = blogs
          .filter(b => b.id !== blog.id)
        setBlogs(updatedBlogs)
        showNotification(`Blog "${blog.title}" by ${blog.author} successfully deleted`, 'success')
      } catch (exception) {
        showNotification(exception.response.data.error, 'error')
      }
    }
  }

  return (
    <>
      <td>
        <ul style={{ listStyle: 'none', paddingLeft: '10px' }}>
          <li>
            {blog.title} <em>{blog.author && 'by ' + blog.author}</em>
          </li>
          {
            showDetails &&
            <>
              <li><a
                href={blog.url.includes('//')
                  ? blog.url
                  : `//${blog.url}`}
                target='_blank'
                rel='noreferrer'
              >
                {blog.url}
              </a></li>
              <li>{blog.likes} likes</li>
              {blog.user &&
                <li>Added by {blog.user.name || blog.user.username}</li>
              }
              {user && blog.user && user.username === blog.user.username &&
                <li>
                  <button style={{ backgroundColor: 'lightpink' }} onClick={handleDelete}>Delete blog</button>
                </li>
              }
            </>
          }
        </ul>
      </td>
      <td>
        <LikeButton blog={blog} updateBlogs={updateBlogs} />
      </td>
      <td>
        <button data-testid='showDetailsButton' onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
      </td>
    </>
  )
}

Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}


export default Blog