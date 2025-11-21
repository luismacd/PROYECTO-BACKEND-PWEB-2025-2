const express = require("express");
const router = express.Router();
const ordenController = require("../controllers/ordenController");

router.post("/", ordenController.createOrden);
router.get("/", ordenController.getOrdenes);

module.exports = router;
