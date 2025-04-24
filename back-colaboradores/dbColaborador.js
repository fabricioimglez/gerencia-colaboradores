const Datastore = require('nedb');
const path = require('path');

const dbColaborador = new Datastore({
  filename: path.join(__dirname, 'colaboradores.db'),
  autoload: true,
});

module.exports = dbColaborador;