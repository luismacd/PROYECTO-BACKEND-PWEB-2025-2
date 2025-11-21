require('dotenv').config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./database");

// Importar rutas
const userRoutes = require("./routes/userRoutes");
const productoRoutes = require("./routes/productoRoutes");
const ordenRoutes = require("./routes/ordenRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }));
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Usar las rutas
app.use("/usuarios", userRoutes);
// Exponer también las rutas de usuario en la raíz (por ejemplo POST /login)
app.use("/", userRoutes);
app.use("/productos", productoRoutes);
app.use("/ordenes", ordenRoutes);

// Iniciar servidor y sincronizar DB
app.listen(PORT, async () => {
  try {
    // Asegurarse de que los modelos se carguen para registrar tablas y asociaciones
    require("./models/user");
    require("./models/producto");
    require("./models/orden");
    require("./models/OrdenProducto");

    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    console.log(`Server running on http://localhost:${PORT}`);
    // Mostrar modelos registrados para depuración
    console.log("Sequelize models:", Object.keys(sequelize.models));
  } catch (error) {
    console.error(" Error al conectar DB:", error);
  }
});
