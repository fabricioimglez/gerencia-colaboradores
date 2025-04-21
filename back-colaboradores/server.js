const express = require('express');
const app = express();
const colaboradoresRoutes = require('./routes/colaboradores');

app.use(express.json());

app.use('/colaboradores', colaboradoresRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});