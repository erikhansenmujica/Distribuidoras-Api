"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");

module.exports = async function (req, res) {
  console.log(req.body)
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
    "SELECT * FROM tbl_pedidos_moviles_para_facturar ORDER BY id desc LIMIT 1",
    function (e, r) {
      if (e) {
        console.log(e, 1);
        res.send({ error: "Conexión a base de datos fallida." });
      } else {
        console.log(r);
        let c = r[0] ? parseInt(r[0].id) + 1 : 1;
        connection.query(
          "INSERT INTO tbl_pedidos_moviles_para_facturar (id,	fecha,	hora,	cliente,	usuario,	ruta,	tilde,	fecha_entrega,	hora_inicio,	id_reparto) VALUES (" +
            "'" +
            c +
            "'" +
            ", " +
            "'" +
            req.body.order.fecha +
            "'" +
            ", " +
            "'" +
            req.body.order.hora +
            "'" +
            ", " +
            "'" +
            req.body.order.cliente +
            "'" +
            ", " +
            "'" +
            req.body.order.usuario +
            "'" +
            ", " +
            "'" +
            req.body.order.ruta +
            "'" +
            ", " +
            "'" +
            req.body.order.tilde +
            "'" +
            ", " +
            "'" +
            req.body.order.fecha_entrega +
            "'" +
            ", " +
            "'" +
            req.body.order.hora_inicio +
            "'" +
            ", " +
            "'" +
            "0" +
            "'" +
            ")",
          function (err, re) {
            console.log(err, 2);
            if (err) res.send({ error: "Conexión a base de datos fallida." });
            else if (re) {
              let id1=c
              const insertProducts = ( i = 0, body=req.body, id= id1) => {
                let p = body.products[i]
                console.log(p, i)
                if (p)
                  connection.query(
                    "SELECT * FROM tbl_pedidos_moviles_para_facturar_contenido ORDER BY id_contenido_pedido desc LIMIT 1",
                    function (er, rs) {
                      if (er) {
                        console.log(er, 1);
                        res.send({
                          error: "Conexión a base de datos fallida.",
                        });
                      } else {
                        console.log(rs);
                        let cod = rs[0] ? parseInt(rs[0].id_contenido_pedido) + 1 : 1;
                        connection.query(
                          "INSERT INTO tbl_pedidos_moviles_para_facturar_contenido (id_pedido_movil,	id_contenido_pedido,	producto,	cantidad,	precio,	cliente,	Producto_nombre,	ruta,	id_reparto) VALUES (" +
                            "'" +
                            id +
                            "'" +
                            ", " +
                            "'" +
                            cod +
                            "'" +
                            ", " +
                            "'" +
                            p.codigo +
                            "'" +
                            ", " +
                            "'" +
                            p.quantity +
                            "'" +
                            ", " +
                            "'" +
                            p.precio_venta +
                            "'" +
                            ", " +
                            "'" +
                            body.order.cliente +
                            "'" +
                            ", " +
                            "'" +
                            p.descripcion +
                            "'" +
                            ", " +
                            "'" +
                            body.order.ruta +
                            "'" +
                            ", " +
                            "'" +
                            "0" +
                            "'" +
                            ")",
                          function (error, result) {
                            if (error){
                              console.log(error)
                              res.send({
                                error: "Conexión a base de datos fallida.",
                              });}
                            else {
                              insertProducts( i+=1, body,c, id);
                            }
                          }
                        );
                      }
                    }
                  );
                else {
                  res.send(re);
                }
              };
              insertProducts()
            }
          }
        );
      }
    }
  );
};
