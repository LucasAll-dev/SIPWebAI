const jwt = require('jsonwebtoken');
require('dotenv').config();

//Responsavel por verificar o token JWT e garantir que o usuario está autenticado antes de permitir o acesso as outras rotas
const autenticar = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(401).send('Token não fornecido'); //se o token não for fornecido, returna um erro 401(nao informado)
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //verifica se p token é valido
        req.usuario = decoded; //adciona os dados do usuario a requisição
        next();
    } catch (err) {
        res.status(401).send('Token invalido'); //informar erro 401
    };
};

module.exports = autenticar;