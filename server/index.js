const app = require('./app.js')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${config.PORT}`)
})