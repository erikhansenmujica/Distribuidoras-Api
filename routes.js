"use strict";
const simple = require("./handlers/simple");
const configured = require("./handlers/configured");
const register = require("./handlers/register");
const login = require("./handlers/login");
const getCompanies = require("./handlers/getCompanies");
const {
  companyRoutes,
  companyNewClients,
  companyClients,
  companyAccountMovements,
  companyProducts,
  companyOrders,
  companyOrdersContent,
  companyCobranza,
  companyHistoricOrders,
  companyHistoricOrdersContent,
} = require("./handlers/getDbData");
const getRouteClients = require("./handlers/getRouteClients");
const getDevice = require("./handlers/getDevice");
const updateDevice = require("./handlers/updateDevice");
const newCompanyClient = require("./handlers/newCompanyClient");
const newCompanyOrder = require("./handlers/newCompanyOrder");
const newCompanyPayment = require("./handlers/newPayment");
const companyPriceList = require("./handlers/companyPriceList");
const getRouteOrders = require("./handlers/getRouteOrders");
const orderRouteChange = require("./handlers/orderRouteChange");
const getClientHistorical = require("./handlers/getClientHistorical");
const getAllCompanyClients = require("./handlers/getAllCompanyClients");
const syncDataClosingOrders = require("./handlers/syncDataClosingOrders");
const syncData = require("./handlers/syncData");


module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get("/", simple);
  app.post("/login", login);
  app.post("/register", register);
  app.get("/configured", configured(opts));
  app.get("/companies", getCompanies);
  app.get("/company/routes/:id/:from/:to", companyRoutes);
  app.get("/company/clients/:id/:from/:to", companyClients);
  app.get("/company/allclients/:id/:from/:to", getAllCompanyClients);
  app.get("/company/accountmovements/:id/:from/:to", companyAccountMovements);
  app.get("/company/orders/:id/:from/:to", companyOrders);
  app.get("/company/orderscontent/:id/:from/:to", companyOrdersContent);
  app.get("/company/products/:id/:from/:to", companyProducts);
  app.get("/company/newclients/:id/:from/:to", companyNewClients);
  app.get("/company/cobranza/:id/:from/:to", companyCobranza);
  app.get("/company/historicorders/:id/:from/:to", companyHistoricOrders);
  app.get("/company/historicorderscontent/:id/:from/:to", companyHistoricOrdersContent);
  app.get("/user/device/:id", getDevice);
  app.post("/update/device/:id", updateDevice);
  app.post("/route/clients/:routeId", getRouteClients);
  app.get("/route/orders/:distribuidoraId/:routeId", getRouteOrders);
  app.post("/company/newclient", newCompanyClient);
  app.post("/company/neworder", newCompanyOrder);
  app.post("/company/newpayment", newCompanyPayment);
  app.post("/company/pricelist", companyPriceList);
  app.post("/route/update/order/:distribuidoraId", orderRouteChange);
  app.get("/client/historical/:distribuidoraId/:clientId", getClientHistorical);
  app.post("/sync/appdata/:distribuidoraId",syncDataClosingOrders)
  app.get("/sync/table/:table/:distribuidoraId/:lastPk",syncData)

};
