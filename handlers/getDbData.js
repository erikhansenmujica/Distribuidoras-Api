"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = {
  companyRoutes: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });

    connection.connect();

    connection.query(
      "SELECT * FROM vista_rutas",
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyProducts: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });

    connection.connect();

    connection.query(
      "SELECT * FROM vista_productos",
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyClients: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });

    connection.connect();

    connection.query(
      "SELECT * FROM vista_clientes",
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyAccountMovements: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });

    connection.connect();

    connection.query(
      "SELECT * FROM vista_movimientos_cuenta_corriente",
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
};
