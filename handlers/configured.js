'use strict'

module.exports = function (opts) {
  return function (req, res) {
    res.json({
      opts: opts
    })
  }
}
//columna empresa en pedidos y clientes
//id dispositivo
//sqlite en app