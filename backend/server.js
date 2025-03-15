const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const notesRoutes = require('./routes/notesRoutes.js');
const taskRoutes = require('./routes/taskRoutes.js');
require('dotenv').config();

const app = express(); //instanciando o express
app.use(cors()); // habilitando cors pra permitor requisições
app.use(express.json());// permitindo processos corpos de requisições json
   
// ryuuykz: rotas
app.use('/api', authRoutes);
app.use('/api', notesRoutes);
app.use('/api', taskRoutes);

// rosaj12: para evitar a falhar no servidor é melhor defini-lo, nesse caso 3000
// ryuuykz: troquei a rota do env pra 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    console.log(`Servidor rodando! http://localhost/${PORT}/`);
});