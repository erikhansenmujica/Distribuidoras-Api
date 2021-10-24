"use strict";
const { Distribuidoras } = require("../generalDb/models");
var mysql = require("mysql");
const util = require('util');

module.exports = {
  companyRoutes: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();

    connection.query(
      "SELECT * FROM vista_rutas LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyProducts: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();

    connection.query(
      "SELECT * FROM vista_productos LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyClients: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();

    connection.query(
      "SELECT * FROM vista_clientes LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyAccountMovements: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();

    connection.query(
      "SELECT * FROM vista_movimientos_cuenta_corriente LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyOrders: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });

    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();
    connection.query(
      "SELECT * FROM tbl_pedidos_moviles_para_facturar LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyOrdersContent: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });

    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();
    connection.query(
      "SELECT * FROM tbl_pedidos_moviles_para_facturar_contenido LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyNewClients: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });

    connection.connect();
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.query(
      "SELECT * FROM tbl_clientes_nuevos LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyCobranza: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();

    connection.query(
      "SELECT * FROM tbl_cobranza LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyHistoricOrders: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();

    connection.query(
      "SELECT * FROM vista_historico_tbl_pedidos_moviles LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
  companyHistoricOrdersContent: async function (req, res) {
    const distribuidora = await Distribuidoras.findByPk(req.params.id);
    if (!distribuidora) {
        res.send({error:"Error encontrando la distribuidora."})
        return
    }
    var connection = mysql.createConnection({
      host: distribuidora.db_host,
      password: distribuidora.db_password,
      user: distribuidora.db_user,
      database: distribuidora.db_database,
      port: distribuidora.db_puerto,
    });
    if (!connection) {
      res.send({ error: "Error conectando con base de datos." });
      return;
    }
    connection.connect();

    connection.query(
      "SELECT * FROM vista_historico_tbl_pedidos_moviles_contenido LIMIT "+ req.params.from+", "+req.params.to,
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send({ error: "Error en el servidor." });
          return;
        }
        res.send(results);
      }
    );

    connection.end();
  },
};
