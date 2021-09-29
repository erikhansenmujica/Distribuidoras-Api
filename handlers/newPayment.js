"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = async function (req, res) {
  let distribuidora;
  if (Array.isArray(req.body.payment)) {
    distribuidora = await Distribuidoras.findByPk(req.body.payment[0].company);
  } else
    distribuidora = await Distribuidoras.findByPk(req.body.payment.company);
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
  if (Array.isArray(req.body.payment)) {
    function recursiveQueries(pay = req.body.payment[0], counter = 0) {
        console.log(counter, "@@@@@@@@")
      connection.query(
        "SELECT * FROM tbl_cobranza ORDER BY id desc LIMIT 1",
        function (e, r) {
            
          if (e) {
            res.send({ error: "Conexión a base de datos fallida." });
          } else {
            let c = r[0] ? JSON.stringify(parseFloat(r[0].id)+1) : 1;
            connection.query(
              "INSERT INTO tbl_cobranza (id, fecha, hora, cliente, usuario,	ruta, importe, fecha_cobro_cheque, detalle) VALUES (" +
                "'" +
                c +
                "'" +
                ", " +
                "'" +
                pay.fecha +
                "'" +
                ", " +
                "'" +
                pay.hora +
                "'" +
                ", " +
                "'" +
                pay.cliente +
                "'" +
                ", " +
                "'" +
                pay.usuario +
                "'" +
                ", " +
                "'" +
                pay.ruta +
                "'" +
                ", " +
                "'" +
                pay.importe +
                "'" +
                ", " +
                "'" +
                pay.fecha_cobro +
                "'" +
                ", " +
                "'" +
                pay.detalle +
                "'" +
                ")",
              function (error, result) {
                console.log(error, 2);
                if (error) {
                  res.send({ error: "Conexión a base de datos fallida." });
                  return;
                } else if (counter === req.body.payment.length - 1) {
                  res.send(result);
                  return;
                }
                console.log(req.body,"req.body")
                counter += 1
                recursiveQueries(req.body.payment[counter], counter);
              }
            );
          }
        }
      );
    }
    recursiveQueries()
  } else
    connection.query(
      "SELECT * FROM tbl_cobranza ORDER BY id desc LIMIT 1",
      function (e, r) {
        if (e) {
          console.log(e, 1);
          res.send({ error: "Conexión a base de datos fallida." });
        } else {
          let c = r[0] ? JSON.stringify(parseFloat(r[0].id)+1) : 1;

          connection.query(
            "INSERT INTO tbl_cobranza (id, fecha, hora, cliente, usuario,	ruta, importe, fecha_cobro_cheque, detalle) VALUES (" +
              "'" +
              c +
              "'" +
              ", " +
              "'" +
              req.body.payment.fecha +
              "'" +
              ", " +
              "'" +
              req.body.payment.hora +
              "'" +
              ", " +
              "'" +
              req.body.payment.cliente +
              "'" +
              ", " +
              "'" +
              req.body.payment.usuario +
              "'" +
              ", " +
              "'" +
              req.body.payment.ruta +
              "'" +
              ", " +
              "'" +
              req.body.payment.importe +
              "'" +
              ", " +
              "'" +
              req.body.payment.fecha +
              "'" +
              ", " +
              "'" +
              req.body.payment.detalle +
              "'" +
              ")",
            function (error, result) {
              console.log(error, 2);
              if (error)
                res.send({ error: "Conexión a base de datos fallida." });
              else if (result) res.send(result);
            }
          );
        }
      }
    );
};
