const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('returned blogs have a property named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.forEach(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
    await api
        .post('/api/blogs')
        .send(helper.newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const allBlogs = await helper.blogsInDatabase()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('a new blog has zero likes by default', async () => {
    const response = await api
        .post('/api/blogs')
        .send(helper.newBlog)

    const addedBlog = response.body
    expect(addedBlog.likes).toEqual(0)
})

test('a blog without URL cannot be added', async () => {
    await api
        .post('/api/blogs')
        .send(helper.blogWithoutUrl)
        .expect(400)

    const allBlogs = await helper.blogsInDatabase()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length)
})

test('a blog without title cannot be added', async () => {
    await api
        .post('/api/blogs')
        .send(helper.blogWithoutTitle)
        .expect(400)

    const allBlogs = await helper.blogsInDatabase()
    expect(allBlogs).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => await mongoose.connection.close())
