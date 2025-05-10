const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: 5,
        required: true 
    },
    name: String,
    password: {
        type: String,
        required: true
    },
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        }
    ],
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }
});

module.exports = mongoose.model('User', userSchema);
