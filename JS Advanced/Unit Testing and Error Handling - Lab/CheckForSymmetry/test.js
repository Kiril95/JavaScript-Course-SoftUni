const { expect, assert } = require('chai');
const isSymmetric = require('./CheckForSymmetry');

describe('App', function () {
    it('Should return false if argument is not an Array', function () {
        assert.equal(isSymmetric(null), false);
        assert.equal(isSymmetric(undefined), false);
        assert.equal(isSymmetric('Am'), false);
        assert.equal(isSymmetric(55), false);
        assert.equal(isSymmetric({ name: '', age: 0 }), false);
        assert.equal(isSymmetric(true), false);
        assert.equal(isSymmetric(Symbol), false);
        assert.equal(isSymmetric(0), false);
    });

    it('Should return true if symmetric', function () {
        assert.equal(isSymmetric([1, 2, 1]), true);
    });

    it('Should return false if non-symmetric', function () {
        assert.equal(isSymmetric([1, 2, 1, 1]), false);
    });

    it('Should return true if symmetric', function () {
        assert.equal(true, isSymmetric(['mocha', 'kocha', 'mocha']));
    });

    it('Should return false for non-symmetric with mixed types', function () {
        assert.equal(false, isSymmetric([1, '1']));
    });
});