"use strict";
const {
  Distribuidoras,
} = require("../generalDb/models");
module.exports = async function (req, res) {
  const distribuidoras = await Distribuidoras.findAll();

  res.json(distribuidoras);
};
