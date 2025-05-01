const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    value: { type: Number, required: true, min: 1, max: 5},
    comment: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, requied: true}
})

feedbackSchema.index({user: 1, book: 1}, {unique: true})

module.exports = mongoose.model('Feedback', feedbackSchema)