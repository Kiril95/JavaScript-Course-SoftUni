let { assert } = require('chai');
let lookupChar = require('./CharLookup');

describe('App', function () {
    it('Should return undefined if a non-string input is passed as first parameter', function () {
        assert.equal(lookupChar(2, 10), undefined);
        assert.equal(lookupChar({}, 10), undefined);
        assert.equal(lookupChar([1, 2, 3], 10), undefined);
    });

    it('Should return undefined if a non-number or floating point input is passed as second parameter', function () {
        assert.equal(lookupChar('Test', 'blah'), undefined);
        assert.equal(lookupChar('Test', {}), undefined);
        assert.equal(lookupChar('Test', [1, 2, 3]), undefined);
        assert.equal(lookupChar('Test', 2.5), undefined);
    });

    it('Should return a message if the index is negative', function () {
        assert.equal(lookupChar('Test', -1), "Incorrect index");
    });

    it('Should return a message if the index is bigger than, or equal of the strings length', function () {
        assert.equal(lookupChar('Test', 4), "Incorrect index");
        assert.equal(lookupChar('Test', 6), "Incorrect index");
    });

    it('Should work correctly and return the right char', function () {
        assert.equal(lookupChar('Test', 1), 'e');
    });
})