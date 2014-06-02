var parse = require('csv-parse');

describe('csv-parse', function() {
  it('will', function() {
    parse('"abc", "123"', function(err, output) {
      console.log(err, output);
    });
  });
});
