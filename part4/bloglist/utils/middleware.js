const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const requestLogger = (request, response, next) => {
  logger.info('-'.repeat(30))
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('-'.repeat(30))
  next()
}


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (error, request, response, next) => {
  logger.info('*'.repeat(50))
  logger.error(error.message)
  logger.info('*'.repeat(50))

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 
  else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    // add cleaned token to request object
    request.token = authorization.substring(7)
  }
  next()
}


const userExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (!authorization) {
    return response.status(401).json({ 
      error: 'token missing or invalid' 
    })
  }
  const token = authorization.substring(7)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if (!decodedToken.id) {
    return response.status(401).json({ 
      error: 'token missing or invalid' 
    })
  }

  user = await User.findById(decodedToken.id)
  request.user = user
  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}