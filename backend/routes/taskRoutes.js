const express = require('express');
const { criarTarefa, obterTodasTarefas, obterTarefaPorId, atualizarTarefa, excluirTarefa } = require('../controllers/taskController');
const autenticar = require('../middlewares/authMiddleware');

const rotas = express.Router();

// ryuukyz: rotas das tarefas
rotas.post('/tarefas', autenticar, criarTarefa);

rotas.get('/tarefas', autenticar, obterTodasTarefas);

rotas.get('/tarefas/:id', autenticar, obterTarefaPorId);

rotas.put('/tarefas/:id', autenticar, atualizarTarefa);

rotas.delete('/tarefas/:id', autenticar, excluirTarefa);

module.exports = rotas;