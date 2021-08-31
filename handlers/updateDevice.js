"use strict";
const {
  Dispositivos,
} = require("../generalDb/models");
module.exports = async function (req, res) {
  const dispositivo = await Dispositivos.findAll({
    where: {
      deviceId: req.params.id,
    },
  });
  if (!dispositivo[0]) {
    res.send({ error: "Error del servidor" });
    return;
  }
  dispositivo[0][req.body.key] = req.body.value;
  try {
    await dispositivo[0].save();
    
  } catch (error) {
    res.send({error:"Error del servidor"})
    return;
  }
  res.send(dispositivo[0]);
};
