const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    gutenberg_id: {
        type: Number,
        unique: true,
        required: true
    },
    title: String,
    description: String,
    author: String,
    cover: String,
    epub: String,
    views: { type: Number, default: 0 },
    weeklyView: { type: Number, default: 0},
    downloads: Number,
    lastReset: { type: Date, default: Date.now },
    language: String,
    pageCount: { type: Number, default: Math.floor(Math.random() * 100) },
    addDate: { type: Date, default: Date.now },
    subjects: [String], 
})

bookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
        }
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Book', bookSchema)