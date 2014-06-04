var money = require('../lib/money');
var fs = require('fs');

before(function(next) {
  money.connect(process.env.MONEY_DB,
    process.env.MONEY_DB_USERNAME,
    process.env.MONEY_DB_PASSWORD, {
      dialect: "mysql",
      port: 3306,
      logging: false
    })
    .then(function() {
      return money.sync({force:true});
    })
    .then(function() {
      next();
    })
    .
  catch (function(err) {
    next(err);
  });
});

describe('importMint test', function() {
  it('will . . .', function(done) {
    money.importMintTransactions(fs.createReadStream(
        'private/transactions.csv'),
      function(err) {
        done(err);
      });
  });
});
