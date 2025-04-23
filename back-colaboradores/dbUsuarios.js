const Datastore = require('nedb');
const path = require('path');

const dbUsuarios = new Datastore({
  filename: path.join(__dirname, 'usuarios.db'),
  autoload: true,
});

module.exports = dbUsuarios;