const db = require('../config/db');

// para rota criar nota
const criarNota = async (req, res) => {
    const { titulo, conteudo } = req.body;
    const IdUsuario = req.usuario.id;

    //verifica se um dos valores foi preenchido para criar nota
    if(!conteudo && !titulo) {
        return res.status(400).send('Preencha pelo menos um campo para criar a nota.');
    }
    
    //caso nao preenchido, define como sem valor
    const tituloFinal = titulo || 'Sem titulo';
    const conteudoFinal = conteudo || 'Sem conteudo';

    try {
        const query = 'INSERT INTO notas (titulo, conteudo, usuario_id) VALUES (?, ?, ?)';
        db.query(query, [tituloFinal, conteudoFinal, IdUsuario], (err, results) => {
            if(err) {
                return res.status(500).send('Erro ao criar nota.');
            }
            res.status(200).send('Nota criada com sucesso!');
        });
    } catch(error) {
        res.status(500).send('Erro no servidor');
    }
};

// listar todas as notas do usuario
const listarNotas = async (req, res) => {
    const IdUsuario = req.usuario.id;

    try {
        const query = 'SELECT id, titulo FROM notas WHERE usuario_id = ?';
        db.query(query, [idUsuario], (err, results) => {
            if(erro) {
                return res.status(500).send('Erro ao buscar as notas.');
            }
            res.status(200).json(results);
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
}

// mostrar nota especifica
const verNota = async (req, res) => {
    const { id } = req.params;
    const IdUsuario = req.usuario.id;

    try {
        const query = 'SELECT * FROM notas WHERE id = ? AND usuario_id = ?';
        db.query(query, [id, idUsuario], (err, results) => {
            if(err) {
                return res.status(500).send('Erro ao buscar nota.');
            }
            if(results.length === 0) {
                return res.status(500).send('Nota não encontrada.');
            }
            res.status(200).json(results[0]);
        });
    } catch(error) {
        res.status(500).send('Erro no servidor.');
    }
};

const atualizarNota = async (req, res) => {
    const { id, titulo, conteudo } = req.body;
    const IdUsuario = req.usuario.id;

    if(!id) {
        return res.status(400).send('Id da nota obrigatoria.');
    }

    if(!titulo && !conteudo) {
        return res.status(400).send('Preencha pelo menos um campo para criar a nota.');
    }

    const tituloFinal = titulo || 'Sem titulo';
    const conteudoFinal = conteudo || 'Sem conteudo';

    try {
        const query = 'UPDATE notas SET titulo = ?, conteudo = ?, WHERE id = ? and usuario_id = ?';
        db.query(query,[tituloFinal, conteudoFinal, id, IdUsuario], (err, results) => {
            if(err) {
                return res.send(500).send('Erro ao atualizar nota.');
            }
            if(results.affectedRows === 0) {
                return res.status(500).send('Nota não encontrada.');
            }
           res.status(200).send('Nota atualizada com sucesso!');
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

const excluirNota = async (req, res) => {
    const { id } = req.body;
    const idUsuario = req.usuario.id;

    if(!id) {
        return res.status(400).send('Id da nota obrigatoria.');
    }

    try {
        const query = 'DELETE FROM notas WHERE id = ? AND usuario_id = ?';
        db.query(query, [id, idUsuario], (err, results) => {
            if(err){
                return res.status(500).send('Erro ao excluir nota');
            }
            if(results.affectedRows === 0) {
                return res.status(500).send('Nota não encontrada.');
            }
            return res.status(200).send('Nota excluida com sucesso!');
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

module.exports = { criarNota, listarNotas, verNota, atualizarNota, excluirNota };