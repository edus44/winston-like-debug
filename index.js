const winston = require('winston')
const chalk = require('chalk')
const { inspect } = require('util')
const { SPLAT, MESSAGE, LEVEL } = require('triple-beam')
const { basename } = require('path')
const { LEVELS, getNamespaceColor } = require('./colors')
const props = ['message', 'namespace', 'level', 'timestamp', 'ms', LEVEL, SPLAT, MESSAGE]

/**
 * Returns a child logger with namespace setted
 * @param {WinstonLogger} logger
 * @param {String|Object} module
 */
function withNamespace(logger) {
  return module => {
    const namespace = module.filename ? basename(module.filename, '.js') : module
    return logger.child({ namespace })
  }
}

/**
 * With colors
 */
function likeDebugWithColors(info) {
  const color = getNamespaceColor(info.namespace)

  const level = LEVELS[info.level]
  const namespace = chalk.bold.ansi256(color)(info.namespace || 'default')
  let message =
    typeof info.message === 'string' ? info.message : inspect(info.message, { colors: true })
  const ms = chalk.ansi256(color)(info.ms)

  // Rest object
  const rest = omit(info, props)
  if (Object.keys(rest).length) {
    message += ` ${inspect(rest, { colors: true })}`
  }

  return `${level} ${namespace} ${message} ${ms}`
}

/**
 * Simple
 */
function likeDebug(info) {
  const level = info.level.toUpperCase()
  const namespace = info.namespace || 'default'
  let message = typeof info.message === 'string' ? info.message : JSON.stringify(info.message)

  // Rest object
  const rest = omit(info, props)
  if (Object.keys(rest).length) {
    message += ` ${JSON.stringify(rest)}`
  }

  // Message join
  return `${info.timestamp} ${level} ${namespace} ${message}`
}

module.exports = {
  likeDebug: ({ colors = true } = {}) => {
    if (colors)
      return winston.format.combine(winston.format.ms(), winston.format.printf(likeDebugWithColors))
    else return winston.format.combine(winston.format.timestamp(), winston.format.printf(likeDebug))
  },
  withNamespace,
}

// prettier-ignore
function omit(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
