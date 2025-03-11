const express = require('express');
const { criarNota, listarNotas, verNota, atualizarNota, excluirNota } = require('../controllers/notesController.js');
const autenticar = require('../middlewares/authMiddleware.js');

const rotas = express.Router();

//vou colocar a mesma rota pra todas as opções pq geralmente da pra fazer isso tudo na mesma pagina, pessoal do front resolve isso ai
rotas.post('/notas', autenticar, criarNota);

rotas.get('/notas', autenticar, listarNotas);

//esse aq pra ver nota especifica (no front provavelmente isso vai ser usado pra quando listar as notas, clica na nota especifica e pega essa rota), deixa eles se virarem ai
rotas.get('/notas/:id', autenticar, verNota);

rotas.put('/notas', autenticar, atualizarNota);

rotas.delete('/notas', autenticar, excluirNota);

module.exports = rotas;