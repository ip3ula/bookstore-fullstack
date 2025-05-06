const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");

const Book = require("./models/book.js");
const { MONGODB_URL } = require("./utils/config.js");
const { info, error } = require("./utils/logger.js");
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
app.use("/api/feedbacks", require("./controllers/feedbacks.js"));

app.get("/", (req, res) => {
  res.send("Welcome to the Bookstore API");
});

const GUTENDEX_API = 'https://gutendex.com/books';

const fetchBooksFromGutenberg = async (page = 1) => {
  try {
    const response = await axios.get(`${GUTENDEX_API}?page=${page}`);
    const books = response.data.results;

    const bulkOps = [];

    for (const book of books) {
      if (!book.formats["application/epub+zip"]) continue;

      const exists = await Book.exists({ gutenberg_id: book.id });
      if (exists) continue;

      bulkOps.push({
        insertOne: {
          document: {
            gutenberg_id: book.id,
            title: book.title,
            description: book.description || "",
            author: book.authors?.[0]?.name || "Unknown",
            cover: book.formats["image/jpeg"],
            epub: book.formats["application/epub+zip"],
            addDate: new Date(),
            subjects: book.subjects || [],
          },
        },
      });
    }

    if (bulkOps.length > 0) {
      await Book.bulkWrite(bulkOps);
      info(`Inserted ${bulkOps.length} books from page ${page}`);
    }

    if (response.data.next) {
      setTimeout(() => fetchBooksFromGutenberg(page + 1), 500); // avoid API spam
    } else {
      info("Finished fetching all books from Gutendex");
    }
  } catch (err) {
    error("Error fetching books:", err.message);
  }
};

const connectAndStart = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info("Connected to MongoDB");
    app.listen(3001, () => {
      info("Server running on port 3001");
    });
    fetchBooksFromGutenberg(); // run in background
  } catch (err) {
    error("Startup error:", err.message);
    process.exit(1);
  }
};

connectAndStart();

module.exports = app;
