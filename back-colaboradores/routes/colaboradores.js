const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar colaborador
router.post('/', (req, res) => {
  const colaborador = req.body;
  db.insert(colaborador, (err, novoColaborador) => {
    if (err) return res.status(500).json({ status: false, error: err, info:"Erro ao criar colaborador :( Entre em contato com o suporte." });
    return res.status(200).json({ status: true, info: "Colaborador criado!" });
  });
});

// Listar colaboradors
router.get('/', (req, res) => {
  db.find({}, (err, colaboradores) => {
    if (err) return res.status(500).send(err);
    res.json(colaboradores);
  });
});

// Buscar colaborador por ID
// router.get('/:id', (req, res) => {
//   db.findOne({ _id: req.params.id }, (err, colaborador) => {
//     if (err) return res.status(500).send(err);
//     if (!colaborador) return res.status(404).send('Colaborador não encontrado');
//     res.json(colaborador);
//   });
// });

// Atualizar colaborador
router.put('/:id', (req, res) => {
  db.update({ _id: req.params.id }, { $set: req.body }, {}, (err, numReplaced) => {
    if (err) return res.status(500).json({ status: false, error: err, info:"Erro ao atualizar colaborador :( Entre em contato com o suporte." });
    return res.status(200).json({ status: true, info: "Colaborador editado!" });
  });
});

// Deletar colaborador
router.delete('/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) return res.status(500).json({ status: false, error: err, info:"Erro ao excluir colaborador :( Entre em contato com o suporte." });
    return res.status(200).json({ status: true, info: "Colaborador excluido!" });
  });
});

module.exports = router;