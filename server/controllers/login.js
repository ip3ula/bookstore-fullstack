const loginRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('../utils/config')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

loginRouter.post('/', async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        const correctPassword = user === null 
        ? false
        : await bcrypt.compare(password, user.password)

        if (!(user && correctPassword)) {
            return res.status(401).json({ error: 'invalid username or password' })
        }

        const userForToken = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(userForToken, SECRET)

        res.status(200)
        .send({ token, email: user.email, name: user.name });
    } catch (err) { next (err) }
})

module.exports = loginRouter