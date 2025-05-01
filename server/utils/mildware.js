const { info, error } = require('./logger')
const jwt = require('jsonwebtoken')
const config = require('./config')
const User = require('../models/user')

const errorHandler = (err, req, res, next) => {
    error(err.message)
    switch(err.name) {
        case 'CastError':
            return res.status(400).send({ error: 'malformed id'})
        case 'ValidationError':
            return res.status(400).send({error: err.message})
        case 'JsonWebTokenError':
            return res.status(401).send({ error: 'invaled token'})
        default: next(err)
    }
}

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        req.token = authorization.replace('Bearer ', '')
    } else {
        req.token = null
    }
    next()
}

const userExtractor = async (req, res, next) => {
    const token = req.token
    if (token) {
        const decodedToken = jwt.verify(token, config.SECRET)
        if (!decodedToken.id) {
            return res.status(401).json({ error: 'invalid token' })
        }
        req.user = await User.findById(decodedToken.id)
    }
    next()
}

module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
}