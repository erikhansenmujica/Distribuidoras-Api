'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const register = require("./handlers/register")
const login = require("./handlers/login")
const getCompanies = require('./handlers/getCompanies')
const getCompanyRoutes = require('./handlers/getCompanyRoutes')
const getRouteClients = require('./handlers/getRouteClients')


module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.post('/login', login)
  app.post('/register', register)
  app.get('/configured', configured(opts))
  app.get('/companies',getCompanies)
  app.get("/company/routes/:id", getCompanyRoutes)
  app.post("/route/clients/:routeId", getRouteClients)
}
