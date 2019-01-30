const log = require('./logger')('root')
const authController = require('./auth.controller')

log.verbose('listening', { host: 'localhost' }, { port: 3000 })

authController()
