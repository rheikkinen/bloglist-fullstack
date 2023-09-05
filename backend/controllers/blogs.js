const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
        .populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    const user = request.user

    const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blogToBeDeleted = await Blog.findById(request.params.id)
    if (!blogToBeDeleted) {
        return response.status(204).end()
    }

    const user = request.user

    if (blogToBeDeleted.user.toString() !== user.id.toString()) {
        return response.status(403).end()
    }

    await Blog.findByIdAndRemove(blogToBeDeleted.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const newData = request.body
    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        newData,
        { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedBlog)
})

module.exports = blogsRouter