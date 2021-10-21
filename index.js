"use strict";
const express = require("express");
const httpErrors = require("http-errors");
const pino = require("pino");
const pinoHttp = require("pino-http");
var cors = require("cors");
const db = require("./generalDb");
var bodyParser = require("body-parser");
var https = require('https');
var privateKey  = fs.readFileSync('private_key.key', 'utf8');
var certificate = fs.readFileSync('CSR.csr', 'utf8');

module.exports = function main(options, cb) {
  // Set default options
  var credentials = {key: privateKey, cert: certificate};
  const ready = cb || function () {};
  const opts = Object.assign(
    {
      // Default options
    },
    options
  );

  const logger = pino();

  // Server state
  let server;
  let serverStarted = false;
  let serverClosing = false;

  // Setup error handling
  function unhandledError(err) {
    // Log the errors
    logger.error(err);

    // Only clean up once
    if (serverClosing) {
      return;
    }
    serverClosing = true;

    // If server has started, close it down
    if (serverStarted) {
      server &&
        server.close(function () {
          process.exit(1);
        });
    }
  }
  process.on("uncaughtException", unhandledError);
  process.on("unhandledRejection", unhandledError);

  // Create the express app
  const app = express();

  // Common middleware
  // app.use(/* ... */)
  app.use(pinoHttp({ logger }));
  app.use(cors());
  app.use(bodyParser.json());

  // create application/x-www-form-urlencoded parser
  app.use(bodyParser.urlencoded({ extended: false }));
  // Register routes
  // @NOTE: require here because this ensures that even syntax errors
  // or other startup related errors are caught logged and debuggable.
  // Alternativly, you could setup external log handling for startup
  // errors and handle them outside the node process.  I find this is
  // better because it works out of the box even in local development.
  require("./routes")(app, opts);

  // Common error handlers
  app.use(function fourOhFourHandler(req, res, next) {
    next(httpErrors(404, `Route not found: ${req.url}`));
  });
  app.use(function fiveHundredHandler(err, req, res, next) {
    if (err.status >= 500) {
      logger.error(err);
    }
    res.status(err.status || 500).json({
      messages: [
        {
          code: err.code || "InternalServerError",
          message: err.message,
        },
      ],
    });
  });
  var httpsServer = https.createServer(credentials, app);

  // Start server
  db.sync({ force: false }).then(() => {
    const server = httpsServer.listen(
      process.env.PORT || 8000,
      "0.0.0.0",
      function (err) {
        if (err) {
          return ready(err, app, server);
        }

        // If some other error means we should close
        if (serverClosing) {
          return ready(new Error("Server was closed before it could start"));
        }

        serverStarted = true;
        const addr = server.address();
        logger.info(`Started at ${"0.0.0.0"}:${process.env.PORT || 8000}`);
        ready(err, app, server);
      }
    );
  });
};
