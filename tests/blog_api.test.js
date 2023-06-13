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

describe('when blogs are returned from the database', () => {
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
})

describe('adding a new blog', () => {
    test('succeeds with valid details', async () => {
        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsInDatabase()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('added blog has zero likes by default', async () => {
        const response = await api
            .post('/api/blogs')
            .send(helper.newBlog)

        const addedBlog = response.body
        expect(addedBlog.likes).toEqual(0)
    })

    test('fails if URL is not provided', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogWithoutUrl)
            .expect(400)

        const allBlogs = await helper.blogsInDatabase()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })

    test('fails if title is not provided', async () => {
        await api
            .post('/api/blogs')
            .send(helper.blogWithoutTitle)
            .expect(400)

        const allBlogs = await helper.blogsInDatabase()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deleting a blog', () => {
    test('succeeds if the id is existing', async () => {
        const blogsBeforeDeletion = await helper.blogsInDatabase()
        const blogToBeDeleted = blogsBeforeDeletion[0]
        expect(blogsBeforeDeletion).toContain(blogToBeDeleted)

        await api
            .delete(`/api/blogs/${blogToBeDeleted.id}`)
            .expect(204)

        const blogsAFterDeletion = await helper.blogsInDatabase()
        expect(blogsAFterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)
        expect(blogsAFterDeletion).not.toContain(blogToBeDeleted)
    })
})

afterAll(async () => await mongoose.connection.close())
