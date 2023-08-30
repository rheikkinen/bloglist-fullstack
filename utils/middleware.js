const logger = require('./logger')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('bearer ')) {
        request.token = authorization.replace('bearer ', '')
    } else {
        request.token = null
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
    errorHandler
}