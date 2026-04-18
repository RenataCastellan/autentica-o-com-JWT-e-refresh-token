# API de Autenticação com JWT

## Funcionalidades
- Login com JWT
- Refresh Token
- Rotas protegidas
- Controle de acesso por perfil

## Rotas

### POST /api/login
Realiza login e retorna tokens

### POST /api/refresh
Gera novo access token

### POST /api/logout
Revoga refresh token

### GET /api/usuarios
Rota protegida (admin)

### GET /api/dados
Rota protegida (usuario/admin)

## Tecnologias
- Node.js
- Express
- JWT
