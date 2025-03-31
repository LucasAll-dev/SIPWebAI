
const express = require("express");
const router = express.Router();
const controlador = require("../controllers/IA_controlador");
const autenticar = require("../middlewares/authMiddleware");

router.post("/tarefas", autenticar, controlador.obterSugestaoTarefas);
router.post("/horarios", autenticar, controlador.obterSugestaoHorarios);
router.post("/produtividade", autenticar, controlador, controlador.obterAnalisarProdutividade);

module.exports = router;
