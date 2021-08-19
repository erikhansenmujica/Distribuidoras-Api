"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = async function (req, res) {
  console.log(req.params);
  const distribuidora = await Distribuidoras.findByPk(req.params.id);

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
        console.log(error)
        res.send({ error: "Error en el servidor." });
        return;
      }
      res.send(results);
    }
  );

  connection.end();
};
