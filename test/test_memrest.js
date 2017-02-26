const chai = require('chai');
const assert = chai.assert;

const memrest1 = require('../index')();
const memrest2 = require('../index')();

describe('memrest', () => {

  it('should return stored value', (done) => {
    let value = 'value to store';

    let id = memrest1.post(value);
    assert.equal(memrest1.get(id), value);

    assert(memrest1.delete(id));
    done();
  });

  it('should update stored value', (done) => {
    let value1 = 'value to store';
    let value2 = 'another value to store';

    let id = memrest1.post(value1);
    assert.equal(memrest1.get(id), value1);
    assert.equal(memrest1.put(id, value2), value2);
    assert.equal(memrest1.get(id), value2);

    assert(memrest1.delete(id));
    done();
  });

  it('should patch stored value', (done) => {
    let object1 = {'x': 1, 'y': 2};
    let updates = {'y': 3, 'z': 4};
    let expected = {'x': 1, 'y': 3, 'z': 4};

    let id = memrest1.post(object1);
    assert.equal(memrest1.get(id), object1);
    assert.deepEqual(memrest1.patch(id, updates), expected);
    assert.deepEqual(memrest1.get(id), expected);

    assert(memrest1.delete(id));
    done();
  });

  it('should not update non-existent value', (done) => {
    let id = 'non-existent id';
    assert(!memrest1.put(id, 'anything'));

    assert(!memrest1.delete(id));
    done();
  });

  it('should not patch non-existent value', (done) => {
    let id = 'non-existent id';
    assert(!memrest1.patch(id, 'anything'));

    assert(!memrest1.delete(id));
    done();
  });

  it('should not return a deleted value', (done) => {
    let value = 'value to store';

    let id = memrest1.post(value);
    assert.equal(memrest1.get(id), value);
    assert(memrest1.delete(id));
    assert.isUndefined(memrest1.get(id));
    assert(!memrest1.delete(id)); // Re-delete false.
    assert.isUndefined(memrest1.get(id)); // ...and STILL not there.

    assert(!memrest1.delete(id));
    done();
  });

  it('different stores should not contain same value', (done) => {
    let value = 'value to store';

    let id = memrest1.post(value);
    assert.equal(memrest1.get(id), value);
    assert.isUndefined(memrest2.get(id));

    assert(memrest1.delete(id));
    done();
  });

});
