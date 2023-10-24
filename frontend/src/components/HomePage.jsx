import { useSelector } from 'react-redux'
import Blog from '../features/blogs/Blog'
import BlogForm from '../features/blogs/BlogForm'
import ToggleVisibility from './ToggleVisibility'
import { useRef } from 'react'

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
              <Blog blog={blog} />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default HomePage
