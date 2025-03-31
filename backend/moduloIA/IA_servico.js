
const axios = require("axios");

const URL_BASE_IA = "http://localhost:5000";

async function sugerirTarefas(tarefas) {
    try {
        const resposta = await axios.post(`{URL_BASE_IA}/sugerir-tarefas`,
            {tarefas});
            return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter sugestões de Tarefas:", erro.message);
        throw new Error("Erro ao comunicar com o módulo de IA (tarefas)");
    }
}

async function sugerirHorarios(eventos) {
    try {
        const resposta = await axios.post(`{URL_BASE_IA}/sugerir-horarios`,
            {eventos});
            return resposta.data;
    } catch (erro) {
        console.error("Erro ao obter sugestões de Horários:", erro.message);
        throw new Error("Erro ao comunicar com o módulo de IA (horários)");
    }
}

async function analisarProdutividade(atividades) {
    try {
        const resposta = await axios.post(`{URL_BASE_IA}/produtividade`,
            {atividades});
            return resposta.data;
    } catch (erro) {
        console.error("Erro ao analisar produtividade:", erro.message);
        throw new Error("Erro ao comunicar com o módulo de IA (produtividade)");
    }
}

module.exports = {
    sugerirTarefas, sugerirHorarios, analisarProdutividade,
};
