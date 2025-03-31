
const servico = require("../relatorios/relatorioServico");

async function tempoPorTarefa(req, res) {
    try {
        const dados = await servico.tempoPorTarefa(req.user.id);
        res.json(dados);
    } catch (erro) {
        res.status(500).json({erro:erro.message});
    }
}

async function picosProdutividade(req, res) {
    try {
        const dados = await servico.picosProdutividade(req.user.id);
        res.json(dados);
    } catch (erro) {
        res.status(500).json({erro:erro.message});
    }
}

async function resumoTarefas(req, res) {
    try {
        const dados = await servico.resumoTarefas(req.user.id);
        res.json(dados);
    } catch (erro) {
        res.status(500).json({erro:erro.message});
    }
}

module.exports = {
    tempoPorTarefa, picosProdutividade, resumoTarefas,
};
