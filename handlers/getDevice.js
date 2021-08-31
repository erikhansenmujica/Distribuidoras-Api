"use strict";
const { Dispositivos } = require("../generalDb/models");
module.exports = async function (req, res, next) {
    let disp
    if (!req.params.id) {
        res.send({error:"Id del dispositivo no enviado"})
    }
    try {
       disp=await Dispositivos.findByPk(req.params.id)
    } catch (error) {
        res.send({error:"Error del servidor."})
        return;
    }
    if (!disp) {
        res.send({error:"Dispositivo no registrado."})
        return;
    }
    res.send(disp)
};
