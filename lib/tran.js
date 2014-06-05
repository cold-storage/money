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
      importTran: function importTran(tjson, importId) {
        // make sure not dup
        return Tran.findAll({
            where: {
              date: tjson.date,
              description: tjson.description,
              amount: tjson.amount,
              importId: {
                ne: importId
              }
            }
          })
          .then(function(trans) {
            if (trans.length === 0) {
              // create row
              return Tran.create({
                date: tjson.date,
                description: tjson.description,
                amount: tjson.amount,
                importid: importId,
                importAccountName: tjson.accountName
              });
            } else {
              return false;
            }
          });
      }
    }
  });
  return Tran;
};