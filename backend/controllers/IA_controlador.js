
const ia = require("../moduloIA/IA_servico");

async function obterSugestaoTarefas(req, res) {
    try {
        const tarefas = req.body.tarefas;
        const sugestoes = await ia.sugerirTarefas(tarefas);
        res.json(sugestoes);
    } catch(erro) {
        res.status(500).json({erro:erro.message});
    }
}

async function obterSugestaoHorarios(req, res) {
    try {
        const eventos = req.body.eventos;
        const sugestoes = await ia.sugerirHorarios(eventos);
        res.json(sugestoes);
    } catch(erro) {
        res.status(500).json({erro:erro.message});
    }
}

async function obterAnalisarProdutividade(req, res) {
    try {
        const atividades = req.body.atividades;
        const analise = await ia.analisarProdutividade(atividades);
        res.json(analise);
    } catch(erro) {
        res.status(500).json({erro:erro.message});
    }
}

module.exports = {
    obterSugestaoTarefas, obterSugestaoHorarios, obterAnalisarProdutividade,
};
