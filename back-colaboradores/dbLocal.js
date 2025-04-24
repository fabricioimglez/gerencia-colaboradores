const Datastore = require('nedb');
const path = require('path');

const dbLocal = new Datastore({
  filename: path.join(__dirname, 'locais.db'),
  autoload: true,
});

module.exports = dbLocal;