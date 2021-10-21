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
      "SELECT * FROM vista_rutas",
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
      "SELECT * FROM vista_productos",
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
      "SELECT * FROM vista_clientes",
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
      "SELECT * FROM vista_movimientos_cuenta_corriente",
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
      "SELECT * FROM tbl_pedidos_moviles_para_facturar",
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
      "SELECT * FROM tbl_pedidos_moviles_para_facturar_contenido",
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
      "SELECT * FROM tbl_clientes_nuevos",
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
      "SELECT * FROM tbl_cobranza",
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
      "SELECT * FROM vista_historico_tbl_pedidos_moviles",
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

    // connection.query(
    //   "SELECT * FROM vista_historico_tbl_pedidos_moviles_contenido",
    //   function (error, results, fields) {
    //     if (error) {
    //       console.log(error);
    //       res.send({ error: "Error en el servidor." });
    //       return;
    //     }
    //     res.send(results);
    //   }
    // );
    const query = util.promisify(connection.query).bind(connection);
    let results;
    try {
      results = await query("SELECT * FROM vista_historico_tbl_pedidos_moviles_contenido");
    } catch (error) {
      console.log(error);
      res.send({ error: "Error en el servidor." });
    }
    res.send(results);
    connection.end();
  },
};
