const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//pra rota de registro
const registrar = async (req, res) => {
    const { email, senha } = req.body; //acessa os dados enviados ao corpo da requisição em JSON
    
    if (!email.includes('@')) {
        return res.status(400).send('Email inválido. O email deve conter "@".');
    };
    
    try {
        const senhaCriptografada = await bcrypt.hash(senha, 10); //usando o framework bcrypt pra criptografar a senha
        const query = 'INSERT INTO usuarios (email, senha) VALUES (?, ?)';
        db.query(query, [email, senhaCriptografada], (err, result) => {
            if(err) return res.status(500).send('Erro ao cadastrar usuario.'); //(anotações 2--)
            res.status(201).send('Usuario cadastrado com sucesso!');
        });
    } catch (error) {
        res.status(500).sen('Erro no servidor.');
    }
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
        res.status(200).json({ tokenJWT });
        });
    } catch (error) {
        res.status(500).send('Erro no servidor.');
    }
};

module.exports = { registrar, logar };
