const express = require('express');
const { criarEvento, obterTodosEventos, obterEventoPorId, atualizarEvento, excluirEvento } = require('../controllers/eventController');
const autenticar = require('../middlewares/authMiddleware');

const rotas = express.Router();

// ryuukyz: rotas dos eventos
rotas.post('/eventos', autenticar, criarEvento); 

rotas.get('/eventos', autenticar, obterTodosEventos); 

rotas.get('/eventos/:id', autenticar, obterEventoPorId);

rotas.put('/eventos/:id', autenticar, atualizarEvento);

rotas.delete('/eventos/:id', autenticar, excluirEvento);

module.exports = rotas;