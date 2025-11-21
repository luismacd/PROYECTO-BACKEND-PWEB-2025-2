const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Usuario = require("./user");

const Orden = sequelize.define("ordenes", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    defaultValue: 0.00
  },
  estado: {
    type: DataTypes.ENUM("pendiente", "pagado", "enviado", "cancelado"),
    allowNull: false,
    defaultValue: "pendiente"
  }
}, {
  timestamps: false,
  freezeTableName: true
});

// Relación: una orden pertenece a un usuario
Orden.belongsTo(Usuario, { foreignKey: "usuarioId", as: "usuario" });
Usuario.hasMany(Orden, { foreignKey: "usuarioId", as: "ordenes" });

module.exports = Orden;
