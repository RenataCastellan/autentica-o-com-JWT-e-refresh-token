const { verifyAccessToken } = require("../services/tokenService");

module.exports = (roles = []) => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ error: "Sem token" });
        }

        const token = authHeader.split(" ")[1];

        try {
            const user = verifyAccessToken(token);

            if (roles.length && !roles.includes(user.role)) {
                return res.status(403).json({ error: "Sem permissão" });
            }

            req.user = user;
            next();

        } catch {
            res.status(401).json({ error: "Token inválido ou expirado" });
        }
    };
};