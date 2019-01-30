const { likeDebug, withNamespace } = require('..')
const winston = require('winston')
const { MESSAGE } = require('triple-beam')

const _Date = Date
beforeEach(() => {
  const date = new Date('2016')
  global.Date = jest.fn(() => date)
})
afterEach(() => {
  global.Date = _Date
})

it('should format like debug with colors', () => {
  const res = likeDebug().transform({ level: 'verbose', message: 'db', namespace: 'connected' })
  expect(res[MESSAGE]).toMatchInlineSnapshot(`"[34m[1mV[22m[39m [1m[91mconnected[39m[22m db [91m+0ms[39m"`)
})

it('should format like debug with colors and rest object', () => {
  const res = likeDebug().transform({
    level: 'verbose',
    message: 'db',
    namespace: 'connected',
    myKey: 'myValue',
  })
  expect(res[MESSAGE]).toMatchInlineSnapshot(`"[34m[1mV[22m[39m [1m[91mconnected[39m[22m db { myKey: [32m'myValue'[39m } [91m+0ms[39m"`)
})
it('should format like debug with colors and message as object', () => {
  const res = likeDebug().transform({
    level: 'verbose',
    message: { foo: 'bar' },
    namespace: 'connected',
    other: 'test',
  })
  expect(res[MESSAGE]).toMatchInlineSnapshot(`"[34m[1mV[22m[39m [1m[91mconnected[39m[22m { foo: [32m'bar'[39m } { other: [32m'test'[39m } [91m+0ms[39m"`)
})

it('should format like debug without colors', () => {
  const res = likeDebug({ colors: false }).transform({
    level: 'verbose',
    message: 'db',
    namespace: 'connected',
  })
  expect(res[MESSAGE]).toMatchInlineSnapshot(`"2016-01-01T00:00:00.000Z VERBOSE connected db"`)
})

it('should format like debug without colors and rest object', () => {
  const res = likeDebug({ colors: false }).transform({
    level: 'verbose',
    message: 'db',
    namespace: 'connected',
    myKey: 'myValue',
  })
  expect(res[MESSAGE]).toMatchInlineSnapshot(
    `"2016-01-01T00:00:00.000Z VERBOSE connected db {\\"myKey\\":\\"myValue\\"}"`
  )
})
it('should format like debug without colors and message as object', () => {
  const res = likeDebug({ colors: false }).transform({
    level: 'verbose',
    message: { foo: 'bar' },
    namespace: 'connected',
    other: 'test',
  })
  expect(res[MESSAGE]).toMatchInlineSnapshot(
    `"2016-01-01T00:00:00.000Z VERBOSE connected {\\"foo\\":\\"bar\\"} {\\"other\\":\\"test\\"}"`
  )
})

it('withName should return logger with namespace', () => {
  const logger = winston.createLogger({
    format: winston.format.splat(),
    transports: [new winston.transports.Console({ format: likeDebug({ colors: false }) })],
  })
  console._stdout.write = jest.fn()
  const log = withNamespace(logger)('myNs')
  log.info('test')

  expect(console._stdout.write.mock.calls[0][0]).toMatchInlineSnapshot(`
"2016-01-01T00:00:00.000Z INFO myNs test
"
`)
})
