"use strict";
const {
  Usuarios,
  Distribuidoras,
  Dispositivos,
} = require("../generalDb/models");
module.exports = async function (req, res) {
  const dispositivo = await Dispositivos.findOrCreate({
    where: {
      deviceId: req.body.deviceId,
    },
  });
  const usuario = await Usuarios.create({
    nombre: req.body.name,
    password: req.body.password,
    email: req.body.email,
  });
  const distribuidora = await Distribuidoras.findByPk(req.body.company);
  await distribuidora.setUsuarios(usuario);
  await usuario.setDispositivos(dispositivo[0]);
  res.json(usuario);
};
