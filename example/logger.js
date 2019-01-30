const winston = require('winston')
const { likeDebug, withNamespace } = require('..')
// const { likeDebug, withNamespace } = require('winston-like-debug')

const logger = winston.createLogger({
  format: winston.format.splat(),
})

logger.add(
  new winston.transports.Console({
    level: 'silly',
    format: likeDebug(),
  })
)

logger.add(
  new winston.transports.File({
    level: 'debug',
    filename: __dirname + '/output.log',
    format: likeDebug({ colors: false }),
  })
)

module.exports = withNamespace(logger)
