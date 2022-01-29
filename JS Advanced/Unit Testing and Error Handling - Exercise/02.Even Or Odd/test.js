let { assert } = require('chai');
let isOddOrEven = require('./EvenOrOdd');

describe('App', function(){
    it('Should return undefined if a non-string input is passed', function(){
        assert.equal(isOddOrEven(6), undefined);
        assert.equal(isOddOrEven({}), undefined);
        assert.equal(isOddOrEven([1,2,3]), undefined);
        assert.equal(isOddOrEven(function(){}), undefined);
        assert.equal(isOddOrEven(Symbol), undefined);
        assert.equal(isOddOrEven(true), undefined);
        assert.equal(isOddOrEven(false), undefined);
    });

    it('Should return even', function(){
        assert.equal(isOddOrEven('KirE'), 'even');
    });

    it('Should return odd', function(){
        assert.equal(isOddOrEven('Kirchak'), 'odd');
    });

    it('Should return right result with multiple assertions', function(){
        assert.equal(isOddOrEven('Chai'), 'even');
        assert.equal(isOddOrEven('Mocha'), 'odd');
    });

})