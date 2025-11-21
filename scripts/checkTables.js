const sequelize = require("../src/database");
const Usuario = require("../src/models/user");
const Producto = require("../src/models/producto");
const Orden = require("../src/models/orden");
const OrdenProducto = require("../src/models/OrdenProducto");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión establecida");

    // Crear usuarios con estado
    const usuarios = await Promise.all([
      Usuario.create({
        nombre: "Andrea",
        apellido: "Admin",
        correo: "admin@dashboard.com",
        dni: "00000001",
        password: "admin123",
        tipoUsuario: "admin",
        estado: "activo"
      }),
      Usuario.create({
        nombre: "Luis",
        apellido: "Pérez",
        correo: "luis@correo.com",
        dni: "00000002",
        password: "usuario123",
        tipoUsuario: "usuario",
        estado: "activo"
      }),
      Usuario.create({
        nombre: "María",
        apellido: "Gómez",
        correo: "maria@correo.com",
        dni: "00000003",
        password: "usuario123",
        tipoUsuario: "usuario",
        estado: "inactivo"
      })
    ]);
    console.log("✅ Usuarios creados");

    // Crear productos
    const productos = await Promise.all([
      Producto.create({
        nombre: "Laptop Lenovo",
        presentacion: "ThinkPad X1",
        descripcion: "Ultrabook ligera y potente",
        categoria: "Tecnología",
        stock: 15,
        imagen: "https://example.com/laptop.png"
      }),
      Producto.create({
        nombre: "Mouse Logitech",
        presentacion: "M185 inalámbrico",
        descripcion: "Mouse ergonómico para oficina",
        categoria: "Accesorios",
        stock: 50,
        imagen: "https://example.com/mouse.png"
      }),
      Producto.create({
        nombre: "Monitor Samsung",
        presentacion: "24 pulgadas LED",
        descripcion: "Monitor Full HD",
        categoria: "Pantallas",
        stock: 20,
        imagen: "https://example.com/monitor.png"
      })
    ]);
    console.log("✅ Productos creados");

    // Crear orden para Andrea (admin)
    const orden1 = await Orden.create({
      usuarioId: usuarios[0].id,
      estado: "pendiente",
      total: 0
    });

    let total1 = 0;
    await Promise.all([
      OrdenProducto.create({
        ordenId: orden1.id,
        productoId: productos[0].id,
        cantidad: 2,
        precioUnitario: 1500.00
      }),
      OrdenProducto.create({
        ordenId: orden1.id,
        productoId: productos[1].id,
        cantidad: 1,
        precioUnitario: 80.00
      })
    ]);
    total1 = 2 * 1500 + 1 * 80;
    orden1.total = total1;
    await orden1.save();

    // Actualizar stock
    productos[0].stock -= 2;
    productos[1].stock -= 1;
    await productos[0].save();
    await productos[1].save();

    // Crear orden para Luis (usuario activo)
    const orden2 = await Orden.create({
      usuarioId: usuarios[1].id,
      estado: "pagado",
      total: 0
    });

    let total2 = 0;
    await OrdenProducto.create({
      ordenId: orden2.id,
      productoId: productos[2].id,
      cantidad: 1,
      precioUnitario: 600.00
    });
    total2 = 1 * 600;
    orden2.total = total2;
    await orden2.save();

    productos[2].stock -= 1;
    await productos[2].save();

    console.log("✅ Órdenes creadas y productos asociados");
    console.log("✅ Stock actualizado");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error al insertar datos:", err);
    process.exit(1);
  }
})();
