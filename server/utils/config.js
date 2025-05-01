require('dotenv').config()

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT
const SECRET = process.env.SECRET
const USE_MONGO = process.env.USE_MONGO

module.exports = { MONGODB_URL, PORT, SECRET }