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
    "SELECT * FROM vista_historico_tbl_pedidos_moviles WHERE cliente = " +
      req.params.clientId ,
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send({ error: "Error en el servidor." });
        return;
      }
      function recursiveProductsFetching(pedido = results[0], count = 0) {
        if(!pedido) {res.send(results)
        return}
        connection.query(
          "SELECT * FROM vista_historico_tbl_pedidos_moviles_contenido WHERE id_pedido_movil = " +
            pedido.id 
          ,
          function (err, r, fields) {
            if (err) {
              console.log(err);
              res.send({ err: "Error en el servidor." });
              return;
            }
            pedido.productos = r;
            console.log(r)
            if (count === results.length - 1) {
              console.log(results[0])
              res.send(results);
              return;
            }
            count += 1;
            recursiveProductsFetching(results[count], count);
          }
        );
      }
      recursiveProductsFetching();
    }
  );

};
