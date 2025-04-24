const express = require('express');
const cors = require('cors');
const app = express();

const colaboradoresRoutes = require('./routes/colaboradores');
const loginRoutes = require('./routes/login');
const localRoutes = require('./routes/local');

app.use(express.json());
app.use(cors());

app.use('/colaboradores', colaboradoresRoutes);
app.use('/login', loginRoutes);
app.use('/local', localRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});