const db = require('../config/db');

// ryuukyz: criar novo evento
const criarEvento = async (req, res) => {
    const { titulo, conteudo, data_evento, endereco } = req.body;
    const usuario_id = req.usuario_id;

    if (!titulo || !conteudo || !data_evento || !endereco) {
        return res.status(400).send('Título, conteúdo, data do evento e endereço são obrigatórios.');
    }

    try {
        const query = 'INSERT INTO eventos (titulo, conteudo, data_evento, endereco, usuario_id) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [titulo, conteudo, data_evento, endereco, usuario_id], (err, results) => {
            if (err) {
                return res.status(400).send('Erro ao criar evento.');
            }
            return res.status(200).json({ id: results.insertId, mensagem: 'Evento criado com sucesso!' });
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

// ryuukyz: obter todos os eventos do usuário
const obterTodosEventos = async (req, res) => {
    const usuario_id = req.usuario_id;

    try {
        const query = 'SELECT * FROM eventos WHERE usuario_id = ?';
        db.query(query, [usuario_id], (err, results) => {
            if (err) {
                return res.status(400).send('Erro ao buscar eventos.');
            }
            return res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

// ryuukyz: obter evento por ID
const obterEventoPorId = async (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario_id;

    try {
        const query = 'SELECT * FROM eventos WHERE id = ? AND usuario_id = ?';
        db.query(query, [id, usuario_id], (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao buscar evento.');
            }
            if (results.length === 0) {
                return res.status(404).send('Evento não encontrado.');
            }
            return res.status(200).json(results[0]);
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

// ryuukyz: atualizar evento
const atualizarEvento = (req, res) => {
    const { id } = req.params;
    const { titulo, conteudo, data_evento, endereco } = req.body;
    const usuario_id = req.usuario_id;

    if (!titulo || !conteudo || !data_evento || !endereco) {
        return res.status(400).send('Título, conteúdo, data do evento e endereço são obrigatórios.');
    }

    try {
        const query = 'UPDATE eventos SET titulo = ?, conteudo = ?, data_evento = ?, endereco = ? WHERE id = ? AND usuario_id = ?';
        db.query(query, [titulo, conteudo, data_evento, endereco, id, usuario_id], (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao atualizar evento.');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Evento não encontrado.');
            }
            return res.status(200).send('Evento atualizado com sucesso!');
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

// ryuukyz: excluir evento
const excluirEvento = (req, res) => {
    const { id } = req.params;
    const usuario_id = req.usuario_id;

    try {
        const query = 'DELETE FROM eventos WHERE id = ? AND usuario_id = ?';
        db.query(query, [id, usuario_id], (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao excluir evento.');
            }
            if (results.affectedRows === 0) {
                return res.status(404).send('Evento não encontrado.');
            }
            return res.status(200).send('Evento excluído com sucesso!');
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

module.exports = { criarEvento, obterTodosEventos, obterEventoPorId, atualizarEvento, excluirEvento };