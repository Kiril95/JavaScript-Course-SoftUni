let { assert, expect } = require('chai');
let StringBuilder = require('./StringBuilder');

describe("App", function () {
    it("Should throw an error if a non-string parameter is passed to the static method", function () {
        assert.throws(function () { StringBuilder._vrfyParam(6) }, TypeError, 'Argument must be a string');
        assert.throws(function () { StringBuilder._vrfyParam({}) }, TypeError, 'Argument must be a string');
        assert.throws(function () { StringBuilder._vrfyParam([]) }, TypeError, 'Argument must be a string');
    });

    it("Constructor should work fine", function () {
        let array = new StringBuilder('T');

        assert.equal(array._stringArray[0], 'T');
        assert.deepEqual(array._stringArray, ['T']);
        assert.equal(array._stringArray.length, 1);
        assert.typeOf(array, 'object');
        assert.instanceOf(array, StringBuilder);
    });

    it("Constructor should return an empty array if the string is undefined", function () {
        let array = new StringBuilder(undefined);
        assert.deepEqual(array._stringArray, []); // If it's only equal it doesn't work
    });

    it("Append should work fine", function () {
        let array = new StringBuilder('I am ');
        array.append('great');
        assert.equal(array.toString(), 'I am great');
    });

    it("Append should throw an error if a non-string parameter is passed", function () {
        let array = new StringBuilder('I');
        assert.throws(function () { array.append(7) }, TypeError, 'Argument must be a string');
    });

    it("Prepend should work fine", function () {
        let array = new StringBuilder('you');
        array.prepend('I see ');
        assert.equal(array.toString(), 'I see you');
    });

    it("Prepend should work fine with more operations", function () {
        let array = new StringBuilder('love ');
        array.append('pancakes');
        array.prepend('I ');
        assert.equal(array.toString(), 'I love pancakes');
    });

    it("Prepend should throw an error if a non-string parameter is passed", function () {
        let array = new StringBuilder('I');
        assert.throws(function () { array.prepend(7) }, TypeError, 'Argument must be a string');
    });

    it("InsertAt should work fine", function () {
        let array = new StringBuilder('I am');
        array.insertAt(' on fire', 5);
        assert.equal(array.toString(), 'I am on fire');
    });

    it("InsertAt should work fine with multiple operations", function () {
        let array = new StringBuilder('One ');
        array.append('Two ');
        array.prepend('Zero ');
        array.insertAt('Three', 13)
        assert.equal(array.toString(), 'Zero One Two Three');
    });

    it("InsertAt should throw an error if a non-string parameter is passed", function () {
        let array = new StringBuilder('I');
        assert.throws(function () { array.insertAt(7, 7) }, TypeError, 'Argument must be a string');
    });

    it("Remove should work fine", function () {
        let array = new StringBuilder('Mochai');
        array.remove(0, 2);
        assert.equal(array.toString(), 'chai');
    });

    it('toString should work fine', () => {
        const arr = 'a b c d e';
        let array = new StringBuilder();
        // It needs to have all the aforementioned methods in order to work in Judge
        arr.split('').forEach(x => {
            array.append(x);
            array.prepend(x);
        });
        array.insertAt('chai', 2);
        array.remove(4, 2);
        assert.deepEqual(array.toString(), 'e chd c b aa b c d e');
    });
});