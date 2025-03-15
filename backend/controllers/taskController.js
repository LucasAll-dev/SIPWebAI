const db = require('../config/db');

// ryuukyz: criar nova tarefa
const criarTarefa = async(req, res) => {
    const { titulo, conteudo, data_conclusao } = req.body;
    const usuario_id = req.usuario_id;

    if (!titulo || !conteudo || !data_conclusao) { 
        return res.status(400).send('Titulo, conteudo e data de conclusão são obrigatórios.'); // nao seria melhor usar 'prazo'?
    }
    
    try {
        const query = 'INSERT INTO tarefas (titulo, conteudo, data_conclusao, usuario_id) VALUES (?, ?, ?, ?)';
        db.query(query, [titulo, conteudo, data_conclusao, usuario_id], (err, results) => {
            if (err) {
                return res.status(400).send('Erro ao criar tarefa.');
            }
            return res.status(200).json({ id: results.insertId, mensagem: 'Tarefa criada com sucesso!'});
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

// ryuukyz: pra obter todas as tarefas
const obterTodasTarefas = async(req, res) => {
    const usuario_id = req.usuario_id;

    try {
        const query = 'SELECT * FROM tarefas WHERE usuario_id = ?';
        db.query(query, [usuario_id], (err, results) => {
            if (err) {
                return res.status(400).send('Erro ao buscar tarefas.');
            }
            return res.status(200).json(results);
        });
    } catch (error) {
        res.send(500).status('Erro no servidor');
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
                res.status(500).send('Erro ao buscar tarefa.');
            }
            if (results.length === 0) {
                res.status(404).send('Tarefa não encontrada.');
            }
            return res.status(200).json(results[0]);
        });
    } catch (error) {
        res.send(500).status('Erro no servidor');
    }
};

// ryuukyz: atualizar tarefa
const atualizarTarefa = (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, data_conclusao } = req.body;
    const usuario_id = req.usuario_id;

    if (!titulo || !conteudo || !data_conclusao) { 
        return res.status(400).send('Titulo, conteudo e data de conclusão são obrigatórios.'); // nao seria melhor usar 'prazo'?
    }

    try {
        const query = 'UPDATE tarefas SET titulo = ?, conteudo = ?, data_conclusao = ? WHERE id = ? AND usuario_id = ?';
        db.query(query, [titulo, conteudo, data_conclusao, id, usuario_id], (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar tarefa.');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Tarefa não encontrada.');
            }
            return res.status(200).send('Tarefa atualizada com sucesso!');
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
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
                return res.status(500).send('Erro ao excluir tarefa.');
            }
            if (results.length === 0) {
                return res.status(404).send('Tarefa não encontrada.');
            }
            return res.status(200).send('Tarefa excluida com sucesso!');
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

module.exports = {criarTarefa, obterTodasTarefas, obterTarefaPorId, atualizarTarefa, excluirTarefa};