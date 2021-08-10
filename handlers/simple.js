"use strict";
const { Usuarios, Distribuidoras } = require("../generalDb/models");
module.exports = function (req, res) {
  Distribuidoras.create({ nombre: "rocklets",  db_host: "www.kaio.com.ar",
  db_password: "2N0cHf4$UOoD",
  db_user: "kaiocom_erik",
  db_database: "kaiocom_distribuidora", }).then(() => {
    Usuarios.create({
      nombre: "erik hansen",
      email:"erik@erik.com",
      password:"asd"
    }).then((user) => {
      Distribuidoras.findByPk(1).then((dis) => {
        dis.setUsuarios(user);
      });
    });
  });

  res.json({
    hello: "world!",
  });
};
