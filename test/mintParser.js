var mintParser = require('../lib/mintParser');
var es = require('event-stream');
var fs = require('fs');
var a = require('chai').assert;

var tranArray = [
  '"Date","Description","Original Description","Amount","Transaction Type","Category","Account Name","Labels","Notes"\n',
  '"5/26/2014","Gospel For Asia","Gospel For Asia Carrollton TX","1.00","debit","Gifts & Donations","Citi MasterCard","",""\n',
  '"11/14/2010","Stauffer Outlets","STAUFFER\'S OUTLETS","6.49","debit","Uncategorized","CREDIT CARD","",""\n'
];

describe('mintParser tests', function() {
  it('will', function() {
    var trans = [];
    mintParser.parse(es.readArray(tranArray), function(tran) {
      trans.push(tran);
    }, function() {
      // TODO XXX broken
      a(trans[0].description !== 'Gospel For Asia Carrollton TX');
    });
  });
});
