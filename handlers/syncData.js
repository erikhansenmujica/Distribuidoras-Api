"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");
const res = require("express/lib/response");

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
  if (!connection) {
    res.send({ error: "Error conectando con base de datos." });
    return;
  }
  const table = req.params.table;
  let pk = "";
  if (table === "tbl_clientes_nuevos") {
    pk = "codigo";
  }
  if (table === "vista_clientes") {
    pk = "codigo";
  }
  if (table === "vista_historico_tbl_pedidos_moviles") {
    pk = "id";
  }
  if (table === "vista_historico_tbl_pedidos_moviles_contenido") {
    pk = "id_contenido_pedido";
  }
  if (table === "vista_movimientos_cuenta_corriente") {
    pk = "id_movimiento";
  }
  if (table === "vista_productos") {
    pk = "codigo";
  }
  if (table === "vista_rutas") {
    pk = "codigo_ruta";
  }
  connection.query(
    "SELECT * FROM " + table + " WHERE cast(" + pk + " as unsigned) > " + req.params.lastPk,
    function (e, r) {
      if (e) {
        console.log(e, 1);
        res.send({ error: "Conexión a base de datos fallida." });
      } else {
        res.send(r)

      }
    }
  );
};
