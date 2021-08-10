var mysql      = require('mysql');
var connections =require("../dbcredentials")

module.exports = function (opts) {
    return function (req, res) {
        var connection = mysql.createConnection(connections["test"]);
           
          connection.connect();
           
          connection.query('SELECT * FROM tbl_cuentas', function (error, results, fields) {
            if (error) throw error;
            console.log('The solution is: ', results[0].solution);
            res.send(results)
          });
           
          connection.end();
       
    }
  }



