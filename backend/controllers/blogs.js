const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .sort({ likes: 'desc' })
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
    user: user._id,
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })

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
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newData, {
    new: true,
    runValidators: true,
    context: 'query',
  })
  response.json(updatedBlog)
})

blogsRouter.put('/:id/like', async (request, response) => {
  const newData = request.body

  const filter = { _id: request.params.id }
  const update = { likes: newData.likes }

  const updatedBlog = await Blog.findOneAndUpdate(filter, update, {
    new: true,
    runValidators: true,
    context: 'query',
  }).populate('user', { username: 1, name: 1 })

  response.status(200).json(updatedBlog)
})

blogsRouter.post('/:id/comment', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const { comment } = request.body
  blog.comments.push(comment)
  await blog.save()
  response.status(200).json(blog)
})

module.exports = blogsRouter
