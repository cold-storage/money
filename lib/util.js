// AllDone uses a counter to see when all the callbacks have called back.
// Use this when you are calling multiple calls in a loop and you just want
// to accumulate errors and know when everything has completed.
// Every time you pass this.cb to someone first increment this.i.
// Then when all of the callbacks have called back we will call done.
function AllDone(done) {
  this.i = 0;
  this.errors = null;
  this.done = done;
}

AllDone.prototype.cb = function cb(err) {
  this.i--;
  if (err) {
    if (!this.errors) {
      this.errors = [];
    }
    this.errors.push(err);
  }
  if (this.i === 0) {
    this.done(this.errors);
  }
};

module.exports = {
  AllDone: AllDone
};
