import { useSelector } from 'react-redux'
import BlogForm from '../features/blogs/BlogForm'
import ToggleVisibility from './ToggleVisibility'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)

  return (
    <>
      <ToggleVisibility buttonLabel="Add a new blog" ref={blogFormRef}>
        <BlogForm
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </ToggleVisibility>

      <table>
        <caption style={{ fontSize: '1.5em', fontWeight: 'bolder' }}>
          Blogs
        </caption>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default HomePage
