const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Endpoints de usuarios
router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getUser);

module.exports = router;
