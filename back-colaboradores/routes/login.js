const express = require('express');
const router = express.Router();
const dbUsuarios = require('../dbUsuarios');

// Cria usuário padrão se não existir
dbUsuarios.findOne({ username: 'UserTeste' }, (err, doc) => {
  if (!doc) {
    dbUsuarios.insert({ username: 'UserTeste', password: 'senha123' }); // senha simples para demo
  }
});

// Rota de login
router.post('/', (req, res) => {
  const { username, password } = req.body;

  dbUsuarios.findOne({ username, password }, (err, user) => {
    if (user) {
      res.status(200).json({ success: true, message: 'Login realizado' });
    } else {
      res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }
  });
});

module.exports = router;