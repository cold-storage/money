var parser = require('../lib/parser');
var a = require('chai').assert;

var tranArray = [
  '"Date","Description","Original Description","Amount","Transaction Type","Category","Account Name","Labels","Notes"\n',
  '"5/26/2014","Gospel For Asia","Gospel For Asia Carrollton TX","1.00","debit","Gifts & Donations","Citi MasterCard","",""\n',
  '"11/14/2010","Stauffer Outlets","STAUFFER\'S OUTLETS","6.49","debit","Uncategorized","CREDIT CARD","",""\n'
];

describe('parser tests', function() {
  it('will', function() {
    var tran = parser.tranFromMintLine(tranArray[0]);
    a(!tran);
    tran = parser.tranFromMintLine(tranArray[1]);
    a(tran.date.valueOf() === new Date("5/26/2014").valueOf());
    a(tran.description === "Gospel For Asia Carrollton TX");
    a(tran.amount === -100);
    a(tran.accountName === "Citi MasterCard");
  });
});