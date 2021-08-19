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
  const usuario = await Usuarios.findOrCreate({
    where: {
      nombre: req.body.name,
      password: req.body.password,
      email: req.body.email,
    },
  });
  const distribuidora = await Distribuidoras.findByPk(req.body.company);
  if (!usuario[0]) {
    res.send({ error: "Error del servidor" });
    return;
  }
  if (!distribuidora) {
    res.send({ error: "Error del servidor" });
    return;
  }
  if (!dispositivo[0]) {
    res.send({ error: "Error del servidor" });
    return;
  }
  const device = await usuario[0].getDispositivos({
    where: {
      deviceId: req.body.deviceId,
    },
  });
  if (device[0]) {
    res.send({
      error: "El usuario ya esta resgistrado y pertenece a este dispositivo.",
    });
    return;
  }
  await usuario[0].setDispositivos(dispositivo[0]);

  if (usuario[0].distribuidoraId) {
    res.send({
      error:
        "El usuario ya esta registrado a una empresa."
    });
    return;
  }
  await distribuidora.setUsuarios(usuario);

  res.json(usuario);
};
