const assert = require('assert').strict;
const testData = require('./testdata');
const { day, hour, timeCurrent, dayCurrent } = require('./time');
const filtered = require('./index').filtered;

describe('filtered', function() {
  let test = filtered(testData);

  it('should run without error', function() {
      assert(test);
  });

  it('should have a starting time before current time', function() {
    for (elem of test) {
        let num = Number(elem.start24.substr(0,2));
        let checkThis = (num <= hour);
        assert.strictEqual(checkThis, true);
    }
  });

  it('should have an ending time after current time', function() {
    for (elem of test) {
        let num = Number(elem.end24.substr(0,2));
        let checkThis = (num > hour);
        assert.strictEqual(checkThis, true);
    }
  });
});

//to run type 'mocha -g filtered'
