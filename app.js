const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')

mongoose.connect(config.MONGO_URI)
    .then(() => logger.info('Connected to db'))
    .catch((error) => logger.error('Error connecting to db', error.message))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter)

module.exports = app
