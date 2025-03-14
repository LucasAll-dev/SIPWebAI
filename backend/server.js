const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const notesRoutes = require('./routes/notesRoutes.js');
require('dotenv').config();

const app = express(); //instanciando o express
app.use(cors()); // habilitando cors pra permitor requisições
app.use(express.json());// permitindo processos corpos de requisições json

//rotas
app.use('/api', authRoutes);
app.use('/api', notesRoutes);

// rosaj12: para evitar a falhar no servidor é melhor defini-lo, nesse caso 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Servidor rodando! http://localhost/${PORT}/`);
});