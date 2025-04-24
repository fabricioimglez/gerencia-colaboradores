const express = require('express');
const router = express.Router();
const db = require('../dbLocal');

router.post('/criar-local', (req, res) => {
  const local = req.body;
  db.insert(local, (err, novoColaborador) => {
    if (err) return res.status(500).json({ status: false, error: err, info:"Erro ao criar local :( Entre em contato com o suporte." });
    return res.status(200).json({ status: true, info: "Local criado!" });
  });
});

router.get('/listar-locais', (req, res) => {
  db.find({}, (err, locais) => {
    if (err) return res.status(500).send(err);
    res.json(locais);
  });
});

router.put('/editar-local/:id', (req, res) => {
  db.update({ _id: req.params.id }, { $set: req.body }, {}, (err, numReplaced) => {
    if (err) return res.status(500).json({ status: false, error: err, info:"Erro ao atualizar local :( Entre em contato com o suporte." });
    return res.status(200).json({ status: true, info: "Local editado!" });
  });
});

router.delete('/excluir-local/:id', (req, res) => {
  db.remove({ _id: req.params.id }, {}, (err, numRemoved) => {
    if (err) return res.status(500).json({ status: false, error: err, info:"Erro ao excluir local :( Entre em contato com o suporte." });
    return res.status(200).json({ status: true, info: "Local excluido!" });
  });
});

module.exports = router;