const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: String,
    description: String,
    cover: String,
    author: String,
    views: { type: Number, default: 0 },
    weeklyView: { type: Number, default: 0},
    lastReset: { type: Date, default: Date.now },
    purchased: { type: Number, default: 0},
    language: String,
    pageCount: Number,
    isbn: String,
    publisher: String,
    published: Number,
    addDate: { type: Date, default: Date.now },
    genres: [String],
    editors: Boolean,
    awards: Boolean,
    price: Number,
    originalPrice: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    }
    
    

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