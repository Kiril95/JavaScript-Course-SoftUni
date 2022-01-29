const {expect, assert} = require('chai');
const sum = require('../SumOfNumbers');

describe('App', function () {
    it('Should sum the numbers right', function () {
        assert.strictEqual(sum([1, 2, 3, 4, 5]), 15);
    });

    it('Should return zero when given certain arguments', function(){
        assert.equal(sum(''), 0);
        assert.equal(sum([]), 0);
    })

    it('Should throw an error when passing invalid argument', function(){
        assert.throws(function(){ sum(null) }, TypeError, 'is not iterable');
        assert.throws(function(){ sum(undefined) }, TypeError, 'is not iterable');
        assert.throws(function(){ sum(1, 2, 3) }, TypeError, 'is not iterable');
    })

    it('Should return NaN if a non number element is trying to get summed', function(){ 
        assert.isNaN(sum([1, 2, 'pepe']), true);
    })
});