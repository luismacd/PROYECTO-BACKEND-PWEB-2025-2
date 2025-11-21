const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Usuario = sequelize.define("usuarios", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  apellido: {
    type: DataTypes.STRING(40),
    allowNull: true
  },
  correo: {
    type: DataTypes.STRING(40),
    allowNull: false,
    unique: true
  },
  dni: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(40),
    allowNull: false
  },
  tipoUsuario: {
    type: DataTypes.ENUM("admin", "usuario"),
    allowNull: false,
    defaultValue: "usuario"
  },
  estado: {
    type: DataTypes.ENUM("activo", "inactivo"),
    allowNull: false,
    defaultValue: "activo"
  }
}, {
  timestamps: false,
  freezeTableName: true
});

module.exports = Usuario;
