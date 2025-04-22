const express = require('express');
const cors = require('cors');
const app = express();

const colaboradoresRoutes = require('./routes/colaboradores');

app.use(express.json());
app.use(cors());

app.use('/colaboradores', colaboradoresRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});