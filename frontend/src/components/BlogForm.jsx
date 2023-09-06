import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleSubmit = event => {
        event.preventDefault()

        try {
            blogService
                .create({ title, author, url })
                .then(returnedBlog => {
                    setBlogs(blogs.concat(returnedBlog))
                })
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            console.error('Cannot create blog', error)
        }
    }

    return (
        <div>
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