var uuid = require('node-uuid');
var es = require('event-stream');
var parser = require('./parser');
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var sequelize;
var Tran;
var Bucket;

// Import transactions from mint.com.
function importMintTransactions(stream) {
  var proms = [];
  var importId = uuid.v1();
  stream.pipe(es.split())
    .pipe(es.map(function(line) {
      var tranjson = parser.tranFromMintLine(line);
      if (tranjson) {
        proms.push(Tran.importTran(tranjson, importId));
      }
    }));
  return Promise.all(proms);
}

// Import pipe separated buckets file.
function importBuckets(stream) {
  var proms = [];
  stream.pipe(es.split())
    .pipe(es.map(function(line) {
      var bjson = parser.bucketFromPipeLine(line);
      if (bjson) {
        proms.push(Bucket.importBucket(bjson));
      }
    }));
  return Promise.all(proms);
}

// Connect to the database. Parameters are defined here
// https://github.com/sequelize/sequelize/wiki/API-Reference-Sequelize#new-sequelize
function connect() {
  // Next two lines are how you do `new Sequelize(arguments)`
  // http://stackoverflow.com/questions/10564245/passing-all-arguments-to-a-constructor
  sequelize = Object.create(Sequelize.prototype);
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
  Tran: Tran,
  Bucket: Bucket,
  importMintTransactions: importMintTransactions,
  importBuckets: importBuckets
};