const log = require('./logger')(module)

module.exports = () => {
  log.info('hi', { from: 'foo' })
  log.verbose({ some: 'test' })
  log.warn('Invalid userid')
  log.silly('Hi %s', 'Bob', { greetings: true }, { when: Date.now() })
  log.error('Error reading file')
  log.debug('config', { my: 'var' })
}
