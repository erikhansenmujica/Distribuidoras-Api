const { Sequelize } = require("sequelize");

// Option 1: Passing a connection URI
const sequelize = new Sequelize(
  "mariadb://kaiocom_erik:2N0cHf4$UOoD@kaio.com.ar:3306/kaiocom_api_distribuidoras"
);

// // Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect:  'mariadb'
// });
module.exports = sequelize;
