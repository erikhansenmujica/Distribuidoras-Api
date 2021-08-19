"use strict";
const { Usuarios } = require("../generalDb/models");
var jwt = require("jsonwebtoken");
module.exports = async function (req, res, next) {
  const usuario = await Usuarios.findOne({
    where: { email: req.body.email },
  }).catch(console.error);
  if (!usuario) {
      res.send({ error: "No existe un usuario con ese email." });
      return;
    }
    const device =await usuario.getDispositivos({
      where: {
        deviceId: req.body.deviceId,
      },
    });
  if (!device[0]) {
    res.send({ error: "Este dispositivo no esta registrado con esta cuenta." });
    return;
  } else if (!req.body.password) {
    res.send({ error: "Por favor escriba la contraseña." });
    return;
  } else {
    if (await usuario.validPassword(req.body.password)) {
      var token = jwt.sign({ ...usuario }, "shhhhh");
      res.send({ auth_token: token });
    } else res.send({ error: "Contraseña equivocada." });
  }
};
