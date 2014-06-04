var uuid = require('node-uuid');
var mintParser = require('./mintParser');
var sequelize;
var transaction;
var Tran;
var Bucket;

// Import transactions from mint.com.
function importMintTransactions(stream, done) {
  mintParser.parse(stream, Tran.importTran, {
    importId: uuid.v1()
  }, done);
}

// Connect to the database. Parameters are defined here
// https://github.com/sequelize/sequelize/wiki/API-Reference-Sequelize#new-sequelize
function connect() {
  var Sequelize = require('sequelize');
  // Next two lines are how you do `new Sequelize(arguments)`
  // http://stackoverflow.com/questions/10564245/passing-all-arguments-to-a-constructor
  sequelize = Object.create(Sequelize.prototype);
  transaction = sequelize.transaction;
  Sequelize.apply(sequelize, arguments);
  return sequelize
    .authenticate()
    .then(function() {
      Tran = require('./tran')(sequelize);
      Bucket = require('./bucket')(sequelize);
      Bucket.hasOne(Tran, {
        foreignKey: 'bucket'
      });
    });
}

// Update the database schema. Parameters are defined here
// https://github.com/sequelize/sequelize/wiki/API-Reference-Sequelize#sync
function sync() {
  return sequelize.sync.apply(sequelize, arguments);
}

module.exports = {
  connect: connect,
  sync: sync,
  transaction: transaction,
  Tran: Tran,
  Bucket: Bucket,
  importMintTransactions: importMintTransactions
};
