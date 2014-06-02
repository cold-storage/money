var mintParser = require('./mintParser');
var Tran = require('./tran');
var sequelize;
var Tran;

function importMintTransactions(stream, done) {
  mintParser.parse(stream, Tran.importTran, done);
}

function connect(info, cb) {
  var Sequelize = require('sequelize');
  sequelize = new Sequelize(
    info.database,
    info.username,
    info.password, {
      dialect: "mysql",
      port: 3306,
      logging: false
    });
  sequelize
    .authenticate()
    .complete(function(err) {
      if (!err) {
        Tran = require('./tran')(sequelize);
      }
      cb(err);
    });
}

function destroyAndRebuildDatabase(cb) {
  sequelize.sync({
    force: true
  }).complete(function(err) {
    cb(err);
  });
}

module.exports = {
  connect: connect,
  destroyAndRebuildDatabase: destroyAndRebuildDatabase,
  importMintTransactions: importMintTransactions
};
