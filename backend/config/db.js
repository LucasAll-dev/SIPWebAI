const mysql = require('mysql2');
require('dotenv').config();

// rosaj12: É melhor utilizar o createPool() ao invés do createConnection(), pois o createPool() gera múltiplas...
// ... conexões automaticamente, enquanto o createConnection() mantém somente uma única conexão
const db = mysql.createPool({ //conectando mySQL 
    //puxando os dados do arquivo .env
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 25,
    queueLimit: 0
});

db.connect((err) => { //verificando a conexao (anotações 1--)
    if(err) throw err;
    console.log('MySQL conectado');
});


// rosaj12: o getConnection evita que o servidor seja derrubado
db.getConnection((err, connection) => {
    if(err) {
        console.error('Erro ao conectar com o MySql: ', err.message);
    } else {
        console.log('MySql Conectado');
        connection.release();
    }
});

module.exports = db;