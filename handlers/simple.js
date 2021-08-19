"use strict";
const { Usuarios, Distribuidoras } = require("../generalDb/models");
module.exports = function (req, res) {
  Distribuidoras.bulkCreate([
    {
      nombre: "Kaio sa",
      db_host: "www.kaio.com.ar",
      db_password: "2N0cHf4$UOoD",
      db_user: "kaiocom_erik",
      db_database: "kaiocom_distribuidora",
      db_puerto: "3306",
    },
    {
      nombre: "Los vascos",
      db_host: "45.173.16.28",
      db_user: "kaiocom_api",
      db_database: "base_api",
      db_puerto: "6033",
      db_password: "5EK1R1iC9BqU",
    },
  ])

  res.json({
    hello: "world!",
  });
};
