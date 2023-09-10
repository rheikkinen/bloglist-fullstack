import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, showNotification, toggleVisibility }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
        try {
            const newBlog = await blogService.create({ title, author, url })
            setBlogs(blogs.concat(newBlog))
            toggleVisibility()
            setTitle('')
            setAuthor('')
            setUrl('')
            showNotification(`A new blog "${newBlog.title}" ${newBlog.author && 'by ' + newBlog.author} successfully added`, 'success')
        } catch (exception) {
            showNotification(exception.response.data.error, 'error')
        }

    }

    return (
        <div>
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        style={{ marginBottom: '2px' }}
                        type="text"
                        value={title}
                        placeholder='Title'
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <input
                        style={{ marginBottom: '2px' }}
                        type='text'
                        value={author}
                        placeholder='Author'
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <input
                        style={{ marginBottom: '2px' }}
                        type='text'
                        value={url}
                        placeholder='Url'
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button style={{ marginTop: '5px' }} type="submit">Submit</button>
            </form>
        </div>
    )
}

export default BlogForm