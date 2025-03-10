const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js')
require('dotenv').config();

const app = express(); //instanciando o express
app.use(cors()); // habilitando cors pra permitor requisições
app.use(express.json());// permitindo processos corpos de requisições json

//rotas
app.use('/api', authRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () =>{
    console.log(`Servidor rodando! http://localhost/${PORT}/`);
});