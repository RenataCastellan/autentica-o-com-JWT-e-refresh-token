const tokenService = require("../services/tokenService");
const tokenRepo = require("../repositories/tokenRepository");

// usuários fake (para teste)
const users = [
    { id: 1, email: "admin@email.com", senha: "123", nome: "Admin", role: "admin" },
    { id: 2, email: "user@email.com", senha: "123", nome: "User", role: "usuario" }
];

// LOGIN
exports.login = (req, res) => {
    const { email, senha } = req.body;

    const user = users.find(u => u.email === email && u.senha === senha);

    if (!user) {
        return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const accessToken = tokenService.generateAccessToken(user);
    const refreshToken = tokenService.generateRefreshToken(user);

    tokenRepo.save(refreshToken, user.id);

    res.json({ accessToken, refreshToken });
};

// REFRESH
exports.refresh = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ error: "Token não enviado" });
    }

    const exists = tokenRepo.find(refreshToken);

    if (!exists) {
        return res.status(403).json({ error: "Token inválido" });
    }

    try {
        const data = tokenService.verifyRefreshToken(refreshToken);

        // remove o antigo (segurança)
        tokenRepo.remove(refreshToken);

        const newAccessToken = tokenService.generateAccessToken({
            id: data.id,
            nome: "User",
            role: "usuario"
        });

        const newRefreshToken = tokenService.generateRefreshToken({ id: data.id });

        tokenRepo.save(newRefreshToken, data.id);

        res.json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });

    } catch {
        res.status(403).json({ error: "Token expirado" });
    }
};

// LOGOUT
exports.logout = (req, res) => {
    const { refreshToken } = req.body;

    tokenRepo.remove(refreshToken);

    res.json({ message: "Logout realizado" });
};