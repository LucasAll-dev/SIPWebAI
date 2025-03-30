const db = require('../config/db');
const axios = require('axios');
const ML_API_URL = process.env.ML_API_URL || 'http://localhost:5000';

//ryuukyz: funções auxiliares pra evitar repetições
const responder = (res, status, dados) => res.status(status).json(dados);
const tratarErro= (res, erro, contexto) => {
    console.error(`Erro em ${contexto}:`, erro);
    return responder(res, 500, {erro: `Erro no servidor (${contexto})`});
}

function calcularDiasRestantes(dataConclusao) {
    const hoje = new Date();
    const conclusao = new Date(dataConclusao);
    return Math.ceil((conclusao - hoje) / (1000 * 60 * 60 * 24));
}

// ryuukyz: criar nova tarefa
// att com prioridade
const criarTarefa = async(req, res) => {
    const { titulo, conteudo, data_conclusao, importancia = 3, complexidade = 2, urgencia = 3 } = req.body;
    const usuario_id = req.usuario_id;

    //ryuukyz: atualização da verificação
    if (!titulo || !conteudo || !data_conclusao) { 
        return responder(res, 400, {
            erro: 'É obrigatorio preencher todos os campos',
            campos: ['titulo', 'conteudo', 'data_conclusao']
        });
    }
    
    try {
        //ryuukyz: chamar api de ML de prioridade
        const { data: { prioridade } } = await axios.post(`${ML_API_URL}/tarefas`, {
            prazo: calcularDiasRestantes(data_conclusao),
            importancia,
            complexidade,
            urgencia
        });

        const query = 'INSERT INTO tarefas (titulo, conteudo, data_conclusao, usuario_id, prioridade, importacia, complexidade, urgencia) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [titulo, conteudo, data_conclusao, usuario_id, prioridade, importancia, complexidade, urgencia], (err, results) => {
            if (err) {
                return tratarErro(res, err, 'Erro ao criar tarefa');
            }
            
            responder(res, 201, {
                id: results.insertId,
                prioridade,
                mensagem: 'Tarefa criada com prioridade'
            });
        });
    } catch (error) {
        tratarErro(res, error, 'Erro no servidor');
    }
};


// ryuukyz: pra obter todas as tarefas
const obterTodasTarefas = async(req, res) => {
    const usuario_id = req.usuario_id;

    try {
        const query = 'SELECT * FROM tarefas WHERE usuario_id = ?';
        db.query(query, [usuario_id], (err, results) => {
            if (err) {
                return tratarErro(res, err, 'Erro ao buscar tarefas.');
            }
            responder(res, 200, results);
        });
    } catch (error) {
        tratarErro(res, error, 'Erro no servidor');
    }
};

//ryuukyz: obter tarefa por id
const obterTarefaPorId = async(req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario_id;

    try{
        const query = 'SELECT * FROM tarefas WHERE id = ? AND usuario_id = ?'
        db.query(query, [id, usuario_id], (err, results) => {
            if (err) {
                return tratarErro(res, err, 'Erro ao buscar tarefa.');
            }
            if (results.length === 0) {
                return responder(res, 404, { erro: 'Tarefa não encontrada' });
            }
            responder(res, 200, results[0]);
        });
    } catch (error) {
        tratarErro(res, error, 'Erro no servidor');
    }
};

// ryuukyz: atualizar tarefa
const atualizarTarefa = (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, data_conclusao, prioridade } = req.body;
    const usuario_id = req.usuario_id;

    // ryuukyz: validação de dados
    if (!titulo || !conteudo || !data_conclusao) { 
        return responder(res, 400, { erro: 'Titulo, conteudo e data de conclusao são obrigatórios.' }); // nao seria melhor usar 'prazo'?
    }
    // ryuukyz: validação caso a prioridade for fornecida
    if (prioridade && (prioridade <1 || prioridade > 5)) {
        return responder(res, 400, { erro: 'Prioridade deve ser entre 1 e 5' });
    }

    try {
        const query = prioridade ? 'UPDATE tarefas SET titulo = ?, conteudo = ?, data_conclusao = ?, prioridade = ? WHERE id = ? AND usuario_id = ?' : 'UPDATE tarefas SET titulo = ?, conteudo = ?, data_conclusao = ? WHERE id = ? AND usuario_id = ?';

        const values = prioridade ? [titulo, conteudo, data_conclusao, prioridade, id, usuario_id] : [titulo, conteudo, data_conclusao, id, usuario_id]

        db.query(query, values, (err, results) => {
            if (err) {
                return tratarErro(res, err, 'Erro ao atualizar tarefa.');
            }
            if (results.affectedRows === 0) {
                return responder(res, 404, { erro: 'Tarefa não encontrada' });      
            }
            responder(res, 200, { sucesso: true });
        });
    } catch (error) {
        tratarErro(res, error, 'Erro no Servidor');
    }
};

// ryuukyz: excluir tarefas:
const excluirTarefa = (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario_id;

    try {
        const query = 'DELETE FROM tarefas WHERE id = ? AND usuario_id = ?';
        db.query(query, [id, usuario_id], (err, results) => {
            if (err) {
                return tratarErro(res, err, 'Erro ao excluir tarefa.');
            }
            if (results.length === 0) {
                return responder(res, 404, { erro: 'Tarefa não encontrada' });
            }
            responder(res, 200, { sucesso: true });
        });
    } catch (error) {
        tratarErro(res, error, 'Erro no servidor.');
    }
};

module.exports = {criarTarefa, obterTodasTarefas, obterTarefaPorId, atualizarTarefa, excluirTarefa};