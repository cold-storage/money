var es = require('event-stream');
var AllDone = require('./util').AllDone;

// build standard intermediate transaction structure from mint export line.
function buildTran(line) {
  var a = line.split('","');
  if (!a || a.length < 7 || '"Date' === a[0]) {
    return null;
  }
  var tran = {
    date: new Date(a[0].substring(1)),
    description: a[2],
    amount: parseInt(Number(a[3]) * 100, 10),
    accountName: a[6]
  };
  if ('debit' === a[4]) {
    tran.amount = tran.amount * -1;
  }
  return tran;
}

// parse takes a stream of transactions exported from mint.com and calls
// process(tran) once for each transaction found in the stream where tran is
// JSON like the following.
// ```
// {
//   date: Mon May 26 2014 00:00:00 GMT-0400 (EDT),
//   description: 'Gospel For Asia Carrollton TX',
//   amount: -1099,
//   accountName: 'Citi MasterCard'
// }
// ```
// When we are finished processing all the transactions we call done.
function parse(stream, process, done) {
  var alldone = new AllDone(done);
  stream.pipe(es.split())
    .pipe(es.map(function(line) {
      var tran = buildTran(line);
      if (tran) {
        alldone.i++;
        process(tran, alldone.cb.bind(alldone));
      }
    }));
}

module.exports.parse = parse;
