// build standard intermediate transaction structure from mint export line.
function tranFromMintLine(line) {
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

function bucketFromPipeLine(line) {
  var a = line.split('|');
  if (!a || a.length < 3) {
    return null;
  }
  var bkt = {
    id: parseInt(a[0], 10),
    parent: parseInt(a[1], 10) || null,
    name: a[2].trim(),
    description: ''
  };
  return bkt;
}

module.exports.tranFromMintLine = tranFromMintLine;
module.exports.bucketFromPipeLine = bucketFromPipeLine;