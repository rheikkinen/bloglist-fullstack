const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
  } else {
    request.token = null
  }

  next()
}

const userExtractor = async (request, response, next) => {
  if (request.method === 'GET') {
    return next()
  }

  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'Invalid token' })
    }
    const user = await User.findById(decodedToken.id)
    request.user = user
  } else if (request.method === 'POST') {
    return response.status(401).json({ error: 'Missing token' })
  } else {
    request.user = null
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(400).json({ error: 'Token missing or invalid' })
  } else if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Id is incorrectly formatted' })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  userExtractor,
  errorHandler,
}
