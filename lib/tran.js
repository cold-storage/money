// Tran (transaction)
var S = require('sequelize');
module.exports = function(s) {
  var Tran = s.define('Tran', {
    date: {
      type: S.DATE,
      allowNull: false
    },
    description: {
      type: S.STRING,
      allowNull: false
    },
    amount: {
      type: S.INTEGER,
      allowNull: false
    },
    importid: S.UUID,
    importAccountName: {
      type: S.STRING,
      allowNull: false,
      defaultValue: ''
    }
  }, {
    tableName: 'tran',
    createdAt: 'create_time',
    updatedAt: 'update_time',
    classMethods: {
      importTran: function importTran(tjson, importId, done) {
        // make sure not dup
        Tran.findAll({
          where: {
            date: tjson.date,
            description: tjson.description,
            amount: tjson.amount,
            importId: {
              ne: importId
            }
          }
        })
          .complete(function(err, trans) {
            if (err) {
              return done(err);
            }
            if (trans.length === 0) {
              // create row
              Tran.create({
                date: tjson.date,
                description: tjson.description,
                amount: tjson.amount,
                importid: importId,
                importAccountName: tjson.accountName
              })
                .complete(function(err, tran) {
                  done(err, tran);
                });
            } else {
              done();
            }
          });
      }
    }
  });
  return Tran;
};
