import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <td>
        <ul style={{listStyle: 'none', paddingLeft: '10px'}}>
          <li>
            "{blog.title}" <em>{blog.author && 'by ' + blog.author}</em>
          </li>
          {
            showDetails &&
            <>
              <li><a href={blog.url.includes('//')
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
            </>
          }
        </ul>
      </td>
      <td>
        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? 'Hide details' : 'Show details'}
        </button>
      </td>
    </>
  )
}

export default Blog