const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({ //conectando mySQL 
    //puxando os dados do arquivo .env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => { //verificando a conexao (anotações 1--)
    if(err) throw err;
    console.log('MySQL conectado');
});

module.exports = db;