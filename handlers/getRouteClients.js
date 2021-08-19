"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = async function (req, res) {
  const distribuidora = await Distribuidoras.findByPk(req.body.distribuidoraId);

  var connection = mysql.createConnection({
    host: distribuidora.db_host,
    password: distribuidora.db_password,
    user: distribuidora.db_user,
    database: distribuidora.db_database,
    port: distribuidora.db_puerto,
  });

  connection.connect();

  connection.query(
    "SELECT * FROM vista_clientes WHERE ruta = " + req.params.routeId,
    function (error, results, fields) {
      if (error) {
        res.send({ error: "Error en el servidor." });
        return;
      }
      res.send(results);
    }
  );

  connection.end();
};
