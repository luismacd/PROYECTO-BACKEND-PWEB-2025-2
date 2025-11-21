const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

router.post("/", productoController.createProducto);
router.get("/", productoController.getProductos);

module.exports = router;
