const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar usuário
router.post('/', (req, res) => {
  const colaborador = req.body;
  db.insert(colaborador, (err, novoColaborador) => {
    if (err) return res.status(500).send(err);
    res.status(201).json(novoColaborador);
  });
});

// Listar usuários
router.get('/', (req, res) => {
  db.find({}, (err, colaboradores) => {
    if (err) return res.status(500).send(err);
    res.json(colaboradores);
  });
});

// Buscar usuário por ID
router.get('/:id', (req, res) => {
  db.findOne({ _id: req.params.id }, (err, colaborador) => {
    if (err) return res.status(500).send(err);
    if (!colaborador) return res.status(404).send('Colaborador não encontrado');
    res.json(colaborador);
  });
});

// Atualizar usuário
router.put('/:id', (req, res) => {
  db.update({ _id: req.params.id }, { $set: req.body }, {}, (err, numReplaced) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(numReplaced ? 200 : 404);
  });
});

// Deletar usuário
router.delete('/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(numRemoved ? 200 : 404);
  });
});

module.exports = router;