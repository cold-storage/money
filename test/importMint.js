var money = require('../lib/money');
var fs = require('fs');

before(function(next) {
  money.connect({
    database: process.env.MONEY_DB,
    username: process.env.MONEY_DB_USERNAME,
    password: process.env.MONEY_DB_PASSWORD
  }, function(err) {
    if (err) {
      next(err);
    } else {
      money.destroyAndRebuildDatabase(next);
    }
  });
});

describe('importMint test', function() {
  it('will . . .', function(done) {
    money.importMintTransactions(fs.createReadStream('private/transactions.csv'),
      function(err) {
        done(err);
      });
  });
});
