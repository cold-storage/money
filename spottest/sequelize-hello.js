var Sequelize = require('sequelize'),
  sequelize = new Sequelize('money', process.env.MONEY_DB_USERNAME, process.env
    .MONEY_DB_PASSWORD, {
      dialect: "mysql",
      port: 3306,
    });

describe('sequelize hello world', function() {
  it('will connect to the database', function(done) {
    sequelize
      .authenticate()
      .complete(function(err) {
        done(err);
      });
  });
});
