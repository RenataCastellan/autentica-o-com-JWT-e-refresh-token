const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/login", auth.login);
router.post("/refresh", auth.refresh);
router.post("/logout", auth.logout);

// ROTAS PROTEGIDAS
router.get("/usuarios", authMiddleware(["admin"]), (req, res) => {
    res.json({ msg: "Apenas admin acessa" });
});

router.get("/dados", authMiddleware(["usuario", "admin"]), (req, res) => {
    res.json({ msg: "Dados protegidos" });
});

module.exports = router;