const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//pra rota de registro
const registrar = async (req, res) => {
    const { nome, sobrenome, email, senha } = req.body; //acessa os dados enviados ao corpo da requisição em JSON
    
    if (!email.includes('@')) {
        return res.status(400).send('Email inválido. O email deve conter "@".');
    };
    
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10); //usando o framework bcrypt pra criptografar a senha
        const query = 'INSERT INTO usuarios (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)';
        db.query(query, [nome, sobrenome, email, senhaCriptografada], (err, result) => {
            if(err) {
                if(err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).send('Email já cadastrado.');
                }
                return res.status(500).send('Erro ao cadastrar usuario.'); //(anotações 2--)
            };
            res.status(200).send('Usuario cadastrado com sucesso!');
        });
    } catch (error) {
        res.status(500).sen('Erro no servidor.');
    };
};

// pra rota de login
const logar = async (req, res) => {
    const { email, senha } = req.body;
     
    try {
        const query = 'SELECT * FROM usuarios WHERE email = ?';
        db.query(query, [email], async (err, results) => { //ta verificando o email
            if (err) return res.status(500).send('Erro na execução'); //se houver erro na execução, o erro vai dar aqui
            if(results.length === 0) return res.status(400).send('Usuario não encontrado'); //retorna um erro 400 'bad request'
    
        const usuario = results[0]; //armazena o resultado da query (usuario)

        const validarSenha = await bcrypt.compare(senha, usuario.senha); //compara a senha enviada com a senha criptografada no banco de dados.
        if(!validarSenha) return res.status(400).send('Senha Incorreta.'); //retorna um erro 400
    
        const tokenJWT = jwt.sign({ id: usuario.id }, 'secreto', { expiresIn: '1h' }); //cria um token secreto com as informações do usuario, e tbm permite q ele faça requisições sem precisar logar de novo (duracao 1h)
        res.status(200).json({ 
            logado: 'Usuario logado com sucesso',
            tokenJWT: tokenJWT });
        })
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    };
};

// para rota de atulizar perfil
const atualizarPerfil = async (req, res) => {
    const { nome, sobrenome, email, senhaAntiga, senhaNova} = req.body;
    const idUsuario = req.usuario.id;

    try {
        const buscarUsuario = 'SELECT * FROM usuarios WHERE id = ?'; 
        db.query(buscarUsuario, [idUsuario], async(err, results) => { //buscando dados do usuario
            if (err) {
                return res.status(500).send('Erro ao buscar usuario.');
            }

            if (results.length === 0) {
                return res.status(404).send('Usuário não encontrado.');
            }

            const usuario = results[0];
            
            let senhaCriptografada;
            //verificador: caso o usuario queira trocar a senha, precisa fornecer a senha antiga
            if(senhaNova) {
                if(!senhaAntiga) { 
                    return res.status(400).send('Senha antiga é obrigatoria pra atualizar a senha.');
                }
                const senhaCorreta = await bcrypt.compare(senhaAntiga, usuario.senha);
                if(!senhaCorreta) {
                    return res.status(400).send('Senha antiga incorreta.');
                }

                senhaCriptografada = await bcrypt.hash(senhaNova, 10);
            };
            //atualizar usuario
            const atualizarUsuario = 'UPDATE usuarios SET nome = ?, sobrenome = ?, email = ?, senha = ? WHERE id = ?';
            const valores = [
                nome || usuario.nome,
                sobrenome || usuario.sobrenome,
                email || usuario.email,
                senhaCriptografada || usuario.senha,
                idUsuario
            ];
            db.query(atualizarUsuario, valores, (err, results) => { // caso o usuario não queira trocar esses dados, continuaram os mesmos
                if(err) {
                    if(err.code === 'ER_DUP_ENTRY') {
                        return res.status(400).send('Email já cadastrado.');
                    }
                    return res.status(500).send('Erro ao atualizar perfil.');
                }
                res.status(200).send('Perfil atualizado com sucesso!');   
            })
        })
    } catch (error) {
        res.status(500).send('Erro no servidor');
    };
};

//para rota de excluir perfil
const excluirPerfil = async(req, res) => {
    const idUsuario = req.usuario.id;

    try {
        const query = 'DELETE FROM usuarios WHERE id = ?';
        db.query(query, [idUsuario], (err, results) => {
            if(err) {
                return res.status(500).send('Erro ao excluir perfil.');
            }
            res.status(200).send('Perfil excluído com sucesso!');
        })
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

module.exports = { registrar, logar, atualizarPerfil, excluirPerfil };
