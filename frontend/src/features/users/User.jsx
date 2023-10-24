import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.all.find((user) => user.id === id),
  )

  if (!user) return <div>Loading user data...</div>

  return (
    <>
      <h2>{user.name}</h2>
      <h3>Added blogs {'(' + user.blogs.length + ')'}</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
