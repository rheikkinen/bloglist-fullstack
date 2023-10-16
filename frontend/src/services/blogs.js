import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
  })
  return response.data
}

const deleteBlog = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, {
    headers: { Authorization: token },
  })
  return response.data
}

const like = async (blog) => {
  const response = await axios.put(`${baseUrl}/${blog.id}/like`, {
    likes: blog.likes + 1,
  })

  return response.data
}

export default { getAll, create, setToken, like, deleteBlog }
