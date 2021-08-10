'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const pedircuentas = require("./handlers/dbConnect")
const register = require("./handlers/register")
const getCompanies = require('./handlers/getCompanies')


module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.get('/login', simple)
  app.post('/register', register)
  app.get('/configured', configured(opts))
  app.get('/cuentas', pedircuentas(opts))
  app.get('/companies',getCompanies)
}
