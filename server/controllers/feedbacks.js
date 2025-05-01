const feedbacksRouter = require('express').Router()
const Feedback = require('../models/feedback')
const Book = require('../models/book')
const User = require('../models/user')
const JWT = require('jsonwebtoken')
const { SECRET } = require('../utils/config')

feedbacksRouter.get('/:id', async (req, res, next) => {
    try {
        const feedbacks = await Feedback.find({ book: req.params.id })
            .populate('user', { name: 1 }) 
            .sort({ createdAt: -1 })

        res.json(feedbacks)
    } catch (err) {
        next(err)
    }
})


feedbacksRouter.post('/:id', async (req, res, next) => {
    try {
        const { value , comment } = req.body
        if( !value || !comment ) {
            return res.status(400).json({ error: 'content is missing' })
        }
        if(value < 1 || value > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5'})
        }

        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ error: 'book not found'})
        }
        const decodedToken = JWT.verify(req.token, SECRET)
        if (!decodedToken) {
            return res.status(401).json({ error: 'token is missing or invalid' })
        }

        const user = await User.findById(req.user)
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        let feedback = await Feedback.findOne({user: user._id , book: book._id})

        if (feedback) {
            feedback.value = value
            feedback.comment = comment
            await feedback.save()
        } else {
            feedback = new Feedback({ user, book, comment, value})
            await feedback.save()
        }

        const allFeedbacks = await Feedback.find({ book })
        const average = allFeedbacks.reduce((sum, r) => sum + r.value) / allFeedbacks.length

        book.feedback = {
            average, 
            count: allFeedbacks.length
        }

        await book.save()
        res.status(201).json(feedback)


    } catch (err) { next(err) }
})

module.exports = feedbacksRouter