const express = require('express');
const { registrar, logar, atualizarPerfil, excluirPerfil } = require('../controllers/authController.js');
const autenticar = require('../middlewares/authMiddleware.js');

const rotas = express.Router();

//rota de registro
rotas.post('/registrar', registrar);

//rota de login
rotas.post('/login', logar);

//rota 'protegida' apos o usuario terminar a autentificação completa
//isso é apenas um exemplo
rotas.post('/logado', autenticar, (req, res) => {
    res.send(`Logado com sucesso!
        Bem vindo ${req.usuario.id}!`);
});

//rota pra atualizar o perfil
rotas.put('/perfil', autenticar, atualizarPerfil);

//rota pra deletar perfil
rotas.delete('/perfil', autenticar, excluirPerfil);

module.exports = rotas;