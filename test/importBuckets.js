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
      return money.sync({
        force: true
      });
    })
    .then(function() {
      next();
    })
    .catch(function(err) {
      next(err);
    });
});

describe('importBuckets test', function() {
  it('will . . .', function(done) {
    money.importBuckets(fs.createReadStream(
      'spottest/buckets.txt'))
      .then(function() {
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});