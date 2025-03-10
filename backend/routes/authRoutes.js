const express = require('express');
const { registrar, logar } = require('../controllers/authController.js');
const autenticar = require('../middlewares/authMiddleware.js');

const rotas = express.Router();

//rota de registro
rotas.post('/registrar', registrar);

//rota de login
rotas.post('/login', logar);

//rota 'protegida' apos o usuario terminar a autentificação completa
rotas.post('/logado', autenticar, (req, res) => {
    res.send(`Logado com sucesso!
        Bem vindo ${req.usuario.id}!`);
});

module.exports = rotas;