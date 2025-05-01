const booksRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Book = require('../models/book');
const User = require('../models/user');
const { info } = require('../utils/logger');
const { SECRET } = require('../utils/config');

booksRouter.get('/', async (request, response, next) => {
  try {
    const books = await Book.find({}).populate('user', { username: 1, name: 1 });
    response.json(books);
  } catch (err) {
    next(err);
  }
});

booksRouter.get('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ error: 'Book not found' });
    }

    const now = new Date()
    const diffInDays = (now - new Date(book.lastReset)) / (1000 * 60 * 60 * 24);


    if (diffInDays >= 7) {
      book.weeklyView = 0
      book.lastReset = now
    }

    book.views += 1;
    book.weeklyView += 1;
    await book.save();

    response.json(book);
  } catch (err) {
    next(err);
  }
});

booksRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;
    const token = request.token

    if (!token) {
      return response.status(401).json({ error: 'token missing' });
    }

    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findById(request.user);

    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }

    const requiredFields = ['title', 'cover', 'author', 'published', 'genres', 'language', 'price'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return response.status(400).json({ error: `${field} is required` });
      }
    }

    const book = new Book({
      title: body.title,
      description: body.description,
      cover: body.cover,
      author: body.author,
      language: body.language,
      pageCount: body.pageCount,
      isbn: body.isbn,
      publisher: body.publisher,
      published: body.published,
      genres: body.genres,
      editors: body.editors,
      awards: body.awards,
      price: body.price,
      originalPrice: body.originalPrice,
      user: user._id
    });

    const savedBook = await book.save();
    user.books = user.books.concat(savedBook._id);
    await user.save();

    response.status(201).json(savedBook);
  } catch (err) {
    next(err);
  }
});

booksRouter.delete('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const token = request.token

    if (!token) {
      return response.status(401).json({ error: 'token missing' });
    }

    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findById(request.user);

    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ error: 'Book not found' });
    }

    if (book.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'unauthorized action' });
    }

    await Book.findByIdAndDelete(id);
    user.books = user.books.filter(bookId => bookId.toString() !== id);
    await user.save();

    response.status(204).end();
  } catch (err) {
    next(err);
  }
});

booksRouter.put('/:id', async (request, response, next) => {
  try {
    const id = request.params.id;
    const body = request.body;
    const token = request.token
    if (!token) {
      return response.status(401).json({ error: 'token missing' });
    }
    const decodedToken = jwt.verify(token, SECRET);
    const user = await User.findById(request.user);
    if (!user) {
      return response.status(404).json({ error: 'user not found' });
    }
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ error: 'Book not found' });
    }
    if (book.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'unauthorized action' });
    }

    const updatedBook = {
      title: body.title,
      description: body.description,
      cover: body.cover,
      author: body.author,
      language: body.language,
      pageCount: body.pageCount,
      isbn: body.isbn,
      publisher: body.publisher,
      published: body.published,
      genres: body.genres,
      editors: body.editors,
      award: body.awards,
      price: body.price,
      originalPrice: body.originalPrice
    };

    const bookToUpdate = await Book.findByIdAndUpdate(id, updatedBook, { new: true, runValidators: true });

    response.json(bookToUpdate);
  } catch (err) {
    next(err);
  }
});

module.exports = booksRouter;
