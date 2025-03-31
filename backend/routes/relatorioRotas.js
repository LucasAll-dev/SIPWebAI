
const express = require("express");
const router = express.Router();
const controlador = require("../controllers/relatorioControlador");
const autenticar = require("../middlewares/authMiddleware");

router.get("/tempo-tarefa", autenticar, controlador.tempoPorTarefa);
router.get("/picos-produtividade", autenticar, controlador.picosProdutividade);
router.get("/resumo-tarefa", autenticar, controlador.resumoTarefas);

module.exports = router;
