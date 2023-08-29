const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
})

test('there are initially no users in database', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(0)
})

describe('adding a new user', () => {
    test('succeeds with valid details', async () => {
        const newUser = {
            username: 'test_user',
            name: 'Valid User',
            password: 'test_password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const allUsers = await helper.usersInDatabase()
        expect(allUsers).toHaveLength(1)
        expect(allUsers[0].username).toEqual('test_user')
    })

    test('fails with suitable status code and error message if no password is provided', async () => {
        const newUser = {
            username: 'test_user',
            name: 'Invalid User',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect({ error: 'Password is required' })

        const allUsers = await helper.usersInDatabase()
        expect(allUsers).toHaveLength(0)
    })

    test('fails with suitable status code and error message if password is less than 3 characters long', async () => {
        const newUser = {
            username: 'test_user',
            name: 'Invalid User',
            password: '12'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect({ error: 'Password must be at least 3 characters long' })

        const allUsers = await helper.usersInDatabase()
        expect(allUsers).toHaveLength(0)
    })

    test('fails with suitable status code and error message if username is less than 3 characters long', async () => {
        const newUser = {
            username: 'te',
            name: 'Invalid User',
            password: 'test_password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.error).toContain('Username must be at least 3 characters long')
            })

        const allUsers = await helper.usersInDatabase()
        expect(allUsers).toHaveLength(0)
    })

    test('fails with suitable status code and error message if username is not unique', async () => {
        const newUser = {
            username: 'test_user',
            name: 'Unique User',
            password: 'test_password'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const userWithDuplicateUsername = {
            username: 'test_user',
            name: 'Duplicate User',
            password: 'test_password'
        }

        await api
            .post('/api/users')
            .send(userWithDuplicateUsername)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.error).toContain('Username must be unique')
            })

        const allUsers = await helper.usersInDatabase()
        expect(allUsers).toHaveLength(1)
        expect(allUsers[0].name).toEqual('Unique User')
    })

    test('fails with suitable status code and error message if username is not provided', async () => {
        const newUser = {
            name: 'Invalid User',
            password: 'test_password'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
            .expect(response => {
                expect(response.body.error).toContain('Username is required')
            })

        const allUsers = await helper.usersInDatabase()
        expect(allUsers).toHaveLength(0)
    })
})





afterAll(async () => await mongoose.connection.close())