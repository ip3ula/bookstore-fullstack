const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const Book = require("./models/book.js");

const { MONGODB_URL } = require("./utils/config.js");
const { info, error } = require("./utils/logger.js");
const {} = require("./utils/mildware.js");
const { tokenExtractor, userExtractor, errorHandler } = require("./utils/mildware.js");
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(tokenExtractor);
app.use(userExtractor);
app.use(errorHandler);

app.use("/api/books", require("./controllers/books.js"));
app.use("/api/users", require("./controllers/users.js"));
app.use("/api/login", require("./controllers/login.js"));
app.use("/api/feedbacks", require('./controllers/feedbacks.js'))

const GUTENDEX_API = 'https://gutendex.com/books';

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info("Connected to MongoDB");
  } catch (exception) {
    error("Error connecting to MongoDB:", exception.message);
  }
};

const fetchBooksFromGutenberg = async (page = 1) => {
  try {
    const response = await axios.get(`${GUTENDEX_API}?page=${page}`);
    const books = response.data.results;

    for (const book of books) {
      const existingBook = await Book.findOne({ gutenberg_id: book.id });
      if (!existingBook) {
        const newBook = new Book({
          gutenberg_id: book.id,
          title: book.title,
          description: book.description,
          author: book.authors[0].name,
          cover: book.formats["image/jpeg"],
          epub: book.formats["application/epub+zip"],
          addDate: new Date(),
          subjects: book.subjects,
        })
        await newBook.save();
      }
    }
    if (response.data.next) {
      await fetchBooksFromGutenberg(page + 1);
    } else {
      info("All books fetched from Gutenberg");
    }
   } catch (error) {
      console.error("Error fetching books from Gutenberg:", error);
    }
}

info("Connecting to MongoDB");
connectToMongoDB().then(() => {
  info("Fetching books from Gutenberg");
  fetchBooksFromGutenberg();
})

app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API");
})


module.exports = app;
