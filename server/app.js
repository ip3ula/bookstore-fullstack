const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

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

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    info("Connected to MongoDB");
  } catch (exception) {
    error("Error connecting to MongoDB:", exception.message);
  }
};

info("Connecting to MongoDB");
connectToMongoDB();

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}


module.exports = app;
