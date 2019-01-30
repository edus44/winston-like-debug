joi-env-parse
============

Validates and formats `process.env` using [Joi](https://github.com/hapijs/joi) schemas. Recommended using this library along [dotenv](https://github.com/motdotla/dotenv). 

* All object keys are **camel-cased**.
* Every key not defined in the schema are **discarded**
* Supports nested objects using `__` as separator
* Throws joi `ValidationError` if parse attempt fails

### Usage
```bash
yarn add joi-env-parse
npm install joi-env-parse
```


```js
const { parse } = require('joi-env-parse')

const config = parse( joi => ({
  LISTEN_PORT: joi.number().required(),
  COOKIE_SECRET: joi.string().required()
}))

// { 
//   listenPort: 3000, 
//   cookieSecret: 'mysecret' 
// }

```


### Examples


#### Possible and default values 

```bash
NODE_ENV=development
```

```js
parse( joi => ({
  NODE_ENV: joi.string().required().valid('development', 'production'),
  PORT: joi.number().default(5000)
}))

// { 
//   port: 5000, 
//   nodeEnv: 'development' 
// }

```


#### Nested properties

```bash
MONGO_URI=mongodb://localhost
REDIS__HOST_ADDR=localhost
REDIS__DB=7
NESTED__OBJ__FOO__BAR=myvalue
```

```js
parse( joi => ({
  MONGO_URI: joi.string().uri().required(),
  REDIS__HOST_ADDR: joi.string().required(),
  REDIS__DB: joi.number().required(),
  NESTED__OBJ__FOO__BAR: joi.number().required()
}))

// { 
//   mongoUri: 'mongodb://localhost',
//   redis: { hostAddr: 'localhost', db: 7 }
//   nested: { obj: { foo: { bar: 'myvalue' } } }
// }

```

#### Object and array values

```bash
MY_PARAMS={"a":1,"b":"foo"}
IP_WHITELIST=["192.168.1.1","localhost"]
```

```js
parse( joi => ({
  MY_PARAMS: joi.object().required(),
  IP_WHITELIST: joi.array().required()
}))

// { 
//   myParams: { a: 1, b: 'foo' },
//   ipWhitelist: [ '192.168.1.1', 'localhost' ]
// }

```
