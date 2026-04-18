require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

// prefixo da API
app.use("/api", authRoutes);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});

app.get("/", (req, res) => {
    res.send("API de autenticação funcionando 🚀");
});