
const chalk = require('chalk')

const LEVELS = {
  info: chalk.green.bold('I'),
  warn: chalk.yellow.bold('W'),
  debug: chalk.cyan.bold('D'),
  silly: chalk.gray.bold('S'),
  error: chalk.red.bold('E'),
  verbose: chalk.blue.bold('V'),
}

// prettier-ignore
const colors = [ 20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221 ]

function selectColor(namespace='default') {
  let hash = 0
  for (let i = 0; i < namespace.length; i++) {
    hash = (hash << 5) - hash + namespace.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return colors[Math.abs(hash) % colors.length]
}

const cache = {}
function getNamespaceColor(namespace) {
  if (!cache[namespace]) {
    cache[namespace] = selectColor(namespace)
  }
  return cache[namespace]
}

module.exports  = {
  getNamespaceColor,
  LEVELS
}