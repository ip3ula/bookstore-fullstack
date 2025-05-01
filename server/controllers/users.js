const usersRouter = require('express').Router();
const User = require('../models/user');
const Book = require('../models/book');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

usersRouter.get('/all', async (req, res, next) => {
    try {
        const data = await User.find({})
        res.json(data)
    } catch (err) { next(err)}
})
usersRouter.get('/', async (req, res, next) => {
    try {
        const decodedToken = jwt.verify(req.token, SECRET)
        if (!decodedToken) {
            return res.status(401).json({ error: 'token is missing or invalid'})
        }

        const user = await User.findById(req.user).populate('books', {
            title: 1,
            cover: 1,
            author: 1,
            downloads: 1,
            link: 1,
            published: 1,
            genres: 1,
            rating: 1,
        })
        .populate('favorites', {
            title: 1,
            cover: 1,
        }).populate('cart', {
            title: 1,
            author: 1,
            cover: 1,
            price: 1,
        });
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }
       
        res.json(user);
    } catch (err) {
        next(err);
    }
});

usersRouter.post('/', async (request, response, next) => {
    try {
        const { email, name, password, merchant } = request.body;

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = new User({ email, name, password: passwordHash, merchant });
        const savedUser = await user.save();

        response.json(savedUser);
    } catch (err) {
        next(err);
    }
});

usersRouter.put('/', async (req, res, next) => {
    try {
        const {merchant} = req.body

        const decodedToken = jwt.verify(req.token, SECRET) 
        if (!decodedToken) {
            return res.status(401).json({ error: 'token is missing or invalid' })
        }

        const user = await User.findById(req.user)
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        const userToUpdate = await User.findByIdAndUpdate(req.user, {merchant}, { new: true , runValidators: true})

        res.status(200).json(userToUpdate)
    } catch (err) { next(err) }
})

usersRouter.post('/favorites/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).json({ error: 'the book not found' });
        }

        const token = request.token;
        if (!token) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        const decodedToken = jwt.verify(token, SECRET);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const user = await User.findById(request.user);
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        const isAlreadyFavourite = user.favorites.some(favId => favId.toString() === book._id.toString());
        if (isAlreadyFavourite) {
            return response.status(400).json({ error: 'Book already in favourites' });
        }

        user.favorites.push(book._id);
        await user.save();

        response.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

usersRouter.delete('/favorites/:id', async (request, response, next) => {
    try {
        const id = request.params.id;
        const book = await Book.findById(id);
        if (!book) {
            return response.status(404).json({ error: 'the book not found' });
        }

        const token = request.token;
        if (!token) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }
        const decodedToken = jwt.verify(token, SECRET);
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' });
        }

        const user = await User.findById(request.user);
        if (!user) {
            return response.status(404).json({ error: 'User not found' });
        }

        user.favorites = user.favorites.filter(favId => favId.toString() !== book._id.toString());
        await user.save();

        return response.status(204).end();
    } catch (err) {
        next(err);
    }
});

usersRouter.post('/cart/:id', async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return res.status(404).json({ error: 'book not found' })
        }

        const decodedToken = jwt.verify(req.token, SECRET)
        if (!decodedToken) {
            return res.status(401).json({error: 'token is missing or invalied'})
        }

        const user = User.findById(req.user)
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        const inChart = user.chart.some(book => book.toString() = book._id.toString())
        if(inChart) {
            return res.status(400).json({ error: 'book is already in chart' })
        }

        user.chart.concat(book._id)
        await user.save()

        response.status(201).json(user)
    } catch (err) { next(err) }
})

usersRouter.delete('/cart/:id', async (req, res, err) => {
    try {
        const book = await Book.findById(req.params.id)
        if (!book) {
            return response.status(404).json({ error: 'book is missing' })
        }

        const decodedToken = jwt.verify(req.token, SECRET)
        if (!decodedToken) {
            return res.status(401).json({ error: 'token is missing or invalid'})
        }

        const user = await User.findById(req.user)
        if (!user) {
            return res.status(404).json({ error: 'user not found' })
        }

        user.cart = user.cart.filter(book => book.toString() === book._id)
        await user.save()

        res.status(204).end()
    } catch (err) { next(err) }
})

module.exports = usersRouter;
