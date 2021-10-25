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
  const table = req.body.table ? req.body.table : Object.keys(req.body)[0];
  let pk = "";
  if (table === "tbl_clientes_nuevos") {
    pk = "codigo";
  }
  if (table === "tbl_cobranza") {
    pk = "id";
  }
  if (table === "tbl_pedidos_moviles_para_facturar") {
    pk = "id";
  }
  if (table === "tbl_pedidos_moviles_para_facturar") {
    pk = "id_contenido_pedido";
    connection.query(
      "SELECT * FROM " +
        "tbl_pedidos_moviles_para_facturar_contenido" +
        " ORDER BY cast(" +
        pk +
        " as unsigned) desc LIMIT 1",
      function (e, r) {
        if (e) {
          console.log(e, 1);
          res.send({ error: "Conexión a base de datos fallida." });
        } else {
          let c = r[0]
            ? pk === "codigo"
              ? r[0].codigo + 1
              : (parseFloat(r[0][pk]) + 1).toString()
            : pk === "codigo"
            ? 1
            : "1";
          connection.query(
            "SELECT * FROM " +
              "tbl_pedidos_moviles_para_facturar" +
              " ORDER BY cast(" +
              "id" +
              " as unsigned) desc LIMIT 1",
            function (er, re) {
              let id = re[0] ? (parseFloat(re[0].id) + 1).toString() : "1";
              connection.query(
                "INSERT INTO tbl_pedidos_moviles_para_facturar (id,	fecha,	hora,	cliente,	usuario,	ruta,	tilde,	fecha_entrega,	hora_inicio,	id_reparto) VALUES (" +
                  "'" +
                  id +
                  "'" +
                  ", " +
                  "'" +
                  req.body.fecha +
                  "'" +
                  ", " +
                  "'" +
                  req.body.hora +
                  "'" +
                  ", " +
                  "'" +
                  req.body.cliente +
                  "'" +
                  ", " +
                  "'" +
                  req.body.usuario +
                  "'" +
                  ", " +
                  "'" +
                  req.body.ruta +
                  "'" +
                  ", " +
                  "'" +
                  req.body.tilde +
                  "'" +
                  ", " +
                  "'" +
                  req.body.fecha_entrega +
                  "'" +
                  ", " +
                  "'" +
                  req.body.hora_inicio +
                  "'" +
                  ", " +
                  "'" +
                  "0" +
                  "'" +
                  ")",
                function (error, r) {
                  if (error) {
                    res.send({ error: "Error en el servidor" });
                    return;
                  }
                  req.body.contenido.forEach((thing) => {
                    thing[pk] = c;
                    thing.id_pedido_movil = id;
                    if (typeof c === "string") {
                      c = (parseFloat(c) + 1).toString();
                    } else c += 1;
                  });
                  doBigQuery(
                    "tbl_pedidos_moviles_para_facturar_contenido",
                    req.body.contenido,
                    0,
                    9,
                    res,
                    connection
                  );
                }
              );
            }
          );
        }
      }
    );
  } else if (table !== "tbl_pedidos_moviles_para_facturar_contenido") {
    connection.query(
      "SELECT * FROM " +
        table +
        " ORDER BY cast(" +
        pk +
        " as unsigned) desc LIMIT 1",
      function (e, r) {
        if (e) {
          console.log(e, 1);
          res.send({ error: "Conexión a base de datos fallida." });
        } else {
          let c;
          if (table === "tbl_cobranza") {
            c = r[0] ? r[0].id : "1";
            if (c !== "1") {
              c = (parseFloat(c.split("-")[0]) + 1).toString();
            }
          } else {
            c = r[0]
              ? pk === "codigo"
                ? r[0].codigo + 1
                : (parseFloat(r[0][pk]) + 1).toString()
              : pk === "codigo"
              ? 1
              : "1";
          }
          req.body[Object.keys(req.body)[0]].forEach((thing) => {
            if (typeof c === "string") {
              c = (parseFloat(c) + 1).toString();
              console.log(table);
              if (table === "tbl_cobranza") {
                c = c + "-" + thing.ruta;
              }
            } else c += 1;
            thing[pk] = c;
          });
          doBigQuery(
            Object.keys(req.body)[0],
            req.body[Object.keys(req.body)[0]],
            0,
            9,
            res,
            connection
          );
        }
      }
    );
  }
};
function doBigQuery(tableName, data, start = 0, limit = 9, res, connection) {
  let parameters = [];
  let bigqery = "";
  let minData = data.slice(start, limit);
  let values = "(";
  let i = 0;
  if (!minData[0] || start > data.length) {
    res.send("terminado");
    return;
  }
  for (const key in minData[0]) {
    if (Object.hasOwnProperty.call(minData[0], key)) {
      let prop = key;
      if (i === Object.keys(minData[0]).length - 1) {
        values += prop += ")";
      } else values += prop += ", ";
    }
    i++;
  }
  minData.forEach((d, index) => {
    let string = "(";
    let i = 0;
    for (const key in d) {
      if (Object.hasOwnProperty.call(d, key)) {
        if (index === minData.length - 1 && i === Object.keys(d).length - 1) {
          string += "?) ";
        } else if (i === Object.keys(d).length - 1) {
          string += "?), ";
        } else {
          string += "?, ";
        }

        parameters.push(d[key]);
      }
      i++;
    }
    bigqery += string;
  });
  if (bigqery != "") {
    connection.query(
      "INSERT INTO " +
        tableName +
        " " +
        values +
        " VALUES " +
        bigqery.slice(0, -1) +
        ";",
      parameters,
      function (err, results) {
        if (results)
          doBigQuery(
            tableName,
            data,
            (start = limit),
            (limit += 9),
            res,
            connection
          );
        if (err) {
          console.log(err);
          res.send({ error: "Error actualizando base de datos." });
        }
      }
    );
  }
}
