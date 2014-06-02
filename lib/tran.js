// Tran (transaction)
var S = require('sequelize');
module.exports = function(s) {
  var Tran = s.define('Tran', {
    account: S.INTEGER,
    date: S.DATE,
    description: S.STRING,
    amount: S.INTEGER,
    bucket: S.INTEGER,
    imported: S.BOOLEAN
  }, {
    tableName: 'tran',
    createdAt: 'create_time',
    updatedAt: 'update_time',
    classMethods: {
      importTran: function importTran(tjson, done) {
        //console.log('importTran');
        // make sure valid

        // make sure not dup

        // create row
        Tran.create({
          date: tjson.date,
          description: tjson.description,
          amount: tjson.amount,
          imported: true
        })
          .complete(function(err, tran) {
            done(err, tran);
          });
      }
    }
  });
  return Tran;
};
