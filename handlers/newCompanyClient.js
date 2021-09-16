"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = async function (req, res) {
  const distribuidora = await Distribuidoras.findByPk(req.body.company);
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
  console.log(req.body);
  connection.query(
    "SELECT * FROM tbl_clientes_nuevos ORDER BY codigo desc LIMIT 1",
    function (e, r) {
      if (e) {
        console.log(e, 1);
        res.send({ error: "Conexión a base de datos fallida." });
      } else {
        console.log(r);
        let c = r[0] ? r[0].codigo + 1 : 1;
        connection.query(
          "INSERT INTO tbl_clientes_nuevos (tipo_cuenta, codigo,	nombre,	direccion,	localidad,	provincia,	codigo_postal,	telefono,	email,	datos_entrega,	numero_lista,	cuit,	categoria_de_iva,	ing_brutos,	cod_ruta,	pos_ruta) VALUES (" +
            "'" +
            req.body.tipo_cuenta +
            "'" +
            ", " +
            "'" +
            c +
            "'" +
            ", " +
            "'" +
            req.body.nombre +
            "'" +
            ", " +
            "'" +
            req.body.direccion +
            "'" +
            ", " +
            "'" +
            req.body.localidad +
            "'" +
            ", " +
            "'" +
            req.body.provincia +
            "'" +
            ", " +
            "'" +
            req.body.codigo_postal +
            "'" +
            ", " +
            "'" +
            req.body.telefono +
            "'" +
            ", " +
            "'" +
            req.body.email +
            "'" +
            ", " +
            "'" +
            req.body.datos_entrega +
            "'" +
            ", " +
            "'" +
            req.body.numero_lista +
            "'" +
            ", " +
            "'" +
            req.body.cuit +
            "'" +
            ", " +
            "'" +
            req.body.categoria_de_iva +
            "'" +
            ", " +
            "'" +
            req.body.cuit +
            "'" +
            ", " +
            "'" +
            req.body.cod_ruta +
            "'" +
            ", " +
            "'" +
            req.body.pos_ruta +
            "'" +
            ")",
          function (error, result) {
            console.log(error, 2);
            if (error) res.send({ error: "Conexión a base de datos fallida." });
            else if (result) res.send(result);
          }
        );
      }
    }
  );
};
