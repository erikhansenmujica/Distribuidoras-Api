"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = async function (req, res) {
  const distribuidora = await Distribuidoras.findByPk(req.params.distribuidoraId);
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
    "SELECT * FROM tbl_pedidos_moviles_para_facturar INNER JOIN tbl_pedidos_moviles_para_facturar_contenido ON tbl_pedidos_moviles_para_facturar.id = tbl_pedidos_moviles_para_facturar_contenido.id_pedido_movil WHERE tbl_pedidos_moviles_para_facturar.ruta = " +
    req.params.routeId,
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
};
