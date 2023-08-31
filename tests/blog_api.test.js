const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

let token

beforeAll(async () => {
    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(helper.initialUser)

    const response = await api
        .post('/api/login')
        .send({
            username: helper.initialUser.username,
            password: helper.initialUser.password
        })

    token = response.body.token
})

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
            .set('Authorization', `bearer ${token}`)
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsInDatabase()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('added blog has zero likes by default', async () => {
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(helper.newBlog)

        const addedBlog = response.body
        expect(addedBlog.likes).toEqual(0)
    })

    test('fails if request does not include token', async () => {
        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const allBlogs = await helper.blogsInDatabase()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })

    test('fails if URL is not provided', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(helper.blogWithoutUrl)
            .expect(400)

        const allBlogs = await helper.blogsInDatabase()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })

    test('fails if title is not provided', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(helper.blogWithoutTitle)
            .expect(400)

        const allBlogs = await helper.blogsInDatabase()
        expect(allBlogs).toHaveLength(helper.initialBlogs.length)
    })
})

describe('deleting a blog', () => {
    test('succeeds if the user is the creator of the blog', async () => {
        // create a blog
        const response = await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(helper.newBlog)

        let allBlogs = await helper.blogsInDatabase()
        const blogToBeDeleted = response.body
        const blogsBeforeDeletion = allBlogs.map(blog => blog.id)
        expect(blogsBeforeDeletion).toContain(blogToBeDeleted.id)

        await api
            .delete(`/api/blogs/${blogToBeDeleted.id}`)
            .set('Authorization', `bearer ${token}`)
            .expect(204)

        allBlogs = await helper.blogsInDatabase()
        const blogsAfterDeletion = allBlogs.map(blog => blog.id)
        expect(blogsAfterDeletion).toHaveLength(blogsBeforeDeletion.length - 1)
        expect(blogsAfterDeletion).not.toContain(blogToBeDeleted.id)

    })
})

describe('updating blog details', () => {
    test('succeeds if the id is valid', async () => {
        const blogsBeforeUpdate = await helper.blogsInDatabase()
        const blogToBeUpdated = blogsBeforeUpdate[0]

        const newData = {
            title: 'new title',
            url: 'new url',
            likes: 99
        }

        await api
            .put(`/api/blogs/${blogToBeUpdated.id}`)
            .send(newData)
            .expect(200)

        const updatedBlog = await helper.findBlogById(blogToBeUpdated.id)
        expect(updatedBlog.title).toBe(newData.title)
        expect(updatedBlog.url).toBe(newData.url)
        expect(updatedBlog.likes).toBe(newData.likes)
        expect(updatedBlog.author).toBe(blogToBeUpdated.author) // not updated

        const blogsAfterUpdate = await helper.blogsInDatabase()
        expect(blogsAfterUpdate).toHaveLength(blogsBeforeUpdate.length)
    })
})

afterAll(async () => await mongoose.connection.close())
