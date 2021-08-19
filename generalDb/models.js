const { DataTypes, Model, STRING, BOOLEAN } = require("sequelize");
const sequelize = require("./index");

class Usuarios extends Model {
  async validPassword(password) {
    return password === this.password;
  }
}

Usuarios.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    habilitado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "usuarios",
  }
);

class Dispositivos extends Model {}

Dispositivos.init(
  {
    ultimo_movimiento_cta_cte: {
      type: DataTypes.BIGINT,
    },
    deviceId: {
      primaryKey: true,
      type: STRING,
    },
  },
  {
    sequelize,
    modelName: "dispositivos",
  }
);

class usuario_dispositivo extends Model {}

usuario_dispositivo.init(
  {},
  {
    sequelize,
    modelName: "usuario_dispositivo",
  }
);

class Distribuidoras extends Model {}

Distribuidoras.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    db_host: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    db_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    db_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    db_database: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    db_puerto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "distribuidoras",
  }
);

Dispositivos.belongsToMany(Usuarios, { through: usuario_dispositivo });
Usuarios.belongsToMany(Dispositivos, { through: usuario_dispositivo });
Usuarios.belongsTo(Distribuidoras);
Distribuidoras.hasMany(Usuarios);
module.exports = {
  Usuarios,
  Distribuidoras,
  Dispositivos,
};
