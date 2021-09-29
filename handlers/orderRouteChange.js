"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = async function (req, res) {
  const distribuidora = await Distribuidoras.findByPk(
    req.params.distribuidoraId
  );
  if (!distribuidora) {
    res.send({ error: "Error del servidor" });
    return;
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
    "UPDATE tbl_pedidos_moviles_para_facturar SET ruta = " +
      req.body.newRouteId +
      " WHERE (ruta = " +
      req.body.routeId +
      " AND cliente = " +
      req.body.clientId +
      ")",
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send({ error: "Error en el servidor." });
        return;
      }
      if(!results.affectedRows){
        res.send({ error: "No existe un pedido de ese cliente en esta ruta." });
        return;
      }
      res.send(results);
    }
  );

  connection.end();
};
