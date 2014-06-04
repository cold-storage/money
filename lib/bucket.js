// Bucket (budgeting bucket)
var S = require('sequelize');
module.exports = function(s) {
  var Bucket = s.define('Bucket', {
    name: {
      type: S.STRING,
      allowNull: false
    },
    description: {
      type: S.STRING,
      allowNull: false,
      default: ''
    },
  }, {
    tableName: 'bucket',
    createdAt: 'create_time',
    updatedAt: 'update_time',
    classMethods: {},
    instanceMethods: {}
  });
  Bucket.hasOne(Bucket, {
    as: 'Parent',
    foreignKey: 'parent'
  });
  return Bucket;
};
