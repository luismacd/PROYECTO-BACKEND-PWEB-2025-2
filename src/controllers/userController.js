const Usuario = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "12345"; 

exports.register = async (req, res) => {
  try {
    const { nombre, apellido, correo, dni, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({ nombre, apellido, correo, dni, password: hashedPassword });
    const usuarioSafe = { ...nuevoUsuario.toJSON() };
    delete usuarioSafe.password;
    res.status(201).json(usuarioSafe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { correo, password } = req.body;
    const user = await Usuario.findOne({ where: { correo } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id, correo: user.correo }, SECRET_KEY, { expiresIn: "20h" });
    const usuarioSafe = { ...user.toJSON() };
    delete usuarioSafe.password;
    res.json({ token, usuario: usuarioSafe });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Usuario.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    const usuarioSafe = { ...user.toJSON() };
    delete usuarioSafe.password;
    res.json(usuarioSafe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
