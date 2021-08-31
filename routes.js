'use strict'
const simple = require('./handlers/simple')
const configured = require('./handlers/configured')
const register = require("./handlers/register")
const login = require("./handlers/login")
const getCompanies = require('./handlers/getCompanies')
const {companyRoutes, companyClients, companyAccountMovements, companyProducts} = require('./handlers/getDbData')
const getRouteClients = require('./handlers/getRouteClients')
const getDevice = require('./handlers/getDevice')
const updateDevice = require('./handlers/updateDevice')


module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple)
  app.post('/login', login)
  app.post('/register', register)
  app.get('/configured', configured(opts))
  app.get('/companies',getCompanies)
  app.get("/company/routes/:id", companyRoutes)
  app.get("/company/clients/:id", companyClients)
  app.get("/company/accountmovements/:id", companyAccountMovements)
  app.get("/company/products/:id", companyProducts)
  app.get("/user/device/:id", getDevice)
  app.post("/update/device/:id", updateDevice)
  app.post("/route/clients/:routeId", getRouteClients)
}
