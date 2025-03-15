const db = require('../config/db');
// rosaj12: importando a biblioteca sha-3
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ryuuykz: pra rota de registro
const registrar = async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body; //acessa os dados enviados ao corpo da requisição em JSON
    
    // rosaj12: validação do email através do regex
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        return res.status(400).send('Email inválido.');
    }

    // rosaj12: criptogrando a senha com sha-3
    try {
        const senhaCriptografada = crypto.SHA3(senha).toString();

        const query = 'INSERT INTO usuarios(nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)';
        db.query(query, [nome, sobrenome, email, senhaCriptografada], (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Email já cadastrado.');
                }
                return res.status(500).send('Erro ao cadastrar usuário.');
            }
            return res.status(200).send('Usuário cadastrado.');
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

// ryuuykz:  pra rota de login
const logar = async (req, res) => {
    const { email, senha } = req.body;

        try {
            const query = 'SELECT * FROM usuarios WHERE email = ?';
            db.query(query, [email], async(err, results) => {
                if (err){
                    return res.status(500).send('Erro na execução');
                }
                if (results.length === 0) {
                    return res.status(400).send('Usuário não encontrado');
                }
                const usuario = results[0];

                // rosaj12: comparação a senha com sha-3
                const senhaCriptografada = crypto.SHA3(senha).toString();
                if(senhaCriptografada !== usuario.senha) {
                    return res.status(400).send('Senha incorreta.');
                }

                const tokenJWT = jwt.sign({id: usuario.id}, process.env.JWT_SECRET, {expiresIn: '1h'});

                res.status(200).json({
                    mensagem: 'Usuário logado.', usuario: {id:usuario.id, email: usuario.email},
                    token: tokenJWT
                });
            });
        } catch (error) {
            res.status(500).send('Erro no servidor.');
        }
};

// ryuuykz:  para rota de atulizar perfil
const atualizarPerfil = async (req, res) => {
    const { nome, sobrenome, email, senhaAntiga, senhaNova} = req.body;
    const usuario_id = req.usuario.id; //  ryuukyz: alterei 'IdUsuario' para usuario_id, pra ficar igual do banco de dados

    try {
        const buscarUsuario = 'SELECT * FROM usuarios WHERE id = ?';
        db.query(buscarUsuario,[usuario_id], async(err, results) => {
            if (err) {
                return res.status(500).send('Erro ao buscar usuário');
            }
            if(results.length === 0) {
                return res.status(404).send('Usuário não encontrado.');
            }

            const usuario = results[0];
        });

        const usuario = results[0];

        let senhaCriptografada;
        if (senhaNova) {
            if (!senhaAntiga) {
                return res.status(400).send('Senha antiga é obrigatória para atualização.');
            }
            const senhaAntigaHash = crypto.SHA3(senhaAntiga).toString();
            if(senhaAntigaHash !== usuario.senha) {
                return res.status(400).send('Senha antiga incorreta.');
            }
            senhaCriptografada = crypto.SHA3(senhaNova).toString();
        }
        const atualizarUsuario = 'UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, senha = ? WHERE ID = ?';
        const valores = [nome || usuario.nome, sobrenome || usuario.sobrenome, email || usuario.email,
            senhaCriptografada || usuario.senha, usuario_id];
        db.query(atualizarUsuario, valores, (err,results) => {
            if (err) {
                if(err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Email já está cadastrado no sistema');
                }
                return res.status(500).send('Erro ao atualizar perfil');
            }
            return res.status(200).send('Perfil atualizado.')
        });
    } catch (error) {
        return res.status(500).send('Erro no servidor');
    }
};

// ryuuykz: para rota de excluir perfil
const excluirPerfil = async(req, res) => {
    const {senha} = req.body; // rosaj12: o usuário deve fornecera senha para excluir a conta
    
    const usuario_id = req.usuario.id;

    try {
        // rosaj12: buscar o usuário pelo ID para oter a senha armazenada
        const buscarUsuario = 'SELECT senha FROM usuarios WHERE ID = ?';
        db.query(buscarUsuario, [usuario_id], async (err, results) => {
            if (err) {
                return res.status(500).send('Erro ao buscar o usuário.');
            }
            if (results.length === 0) {
                return res.status(404).send('Usuário não encontrado.');
            }

            const usuario = results[0];

            // rosaj12: comparação da senha informada com a senha armazenada no SHA-3
            const senhaCriptografada = crypto.SHA3(senha).toString();
            if (senhaCriptografada !== usuario.senha) {
                return res.status(400).send('Senha incorreta. Não é possível excluir sua conta.');
            } 

            // rosaj12 : caso a senha estja correta, prosseguir com a exclusão
            const query = 'DELETE FROM usuarios WHERE ID = ?';
            db.query(query, [usuario_id], (err, results) => {
                if (err) {
                    return res.status(500).send('Erro ao excluir o perfil');
                }
                return res.status(200).send('Perfil excluído com sucesso!');
            });
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};


// resoaj12: exportando funções para uso de rotas
module.exports = { registrar, logar, atualizarPerfil, excluirPerfil };
