let { assert } = require('chai');
let numberOperations = require('./numberOperations.js');

describe("App", function () {
    describe("powNumber", function () {
        it("Should work correctly", function () {
            assert.equal(numberOperations.powNumber(2), 4);
        });
    });

    describe("numberChecker", function () {
        it("Should throw an error if the input is NaN", function () {
            assert.throws(function () { numberOperations.numberChecker('Test') }, Error, 'The input is not a number!');
            assert.throws(function () { numberOperations.numberChecker({}) }, Error, 'The input is not a number!');
            assert.throws(function () { numberOperations.numberChecker(['test']) }, Error, 'The input is not a number!');
        });

        it("Should return a specific message", function () {
            assert.equal(numberOperations.numberChecker(99), 'The number is lower than 100!');
        }); 
 
        it("Should return a specific message", function () {
            assert.equal(numberOperations.numberChecker(111), 'The number is greater or equal to 100!');
            assert.equal(numberOperations.numberChecker(100), 'The number is greater or equal to 100!'); // Border case
        }); 
    });

    describe("sumArrays", function () {
        it("Should work correctly", function () {
            assert.deepEqual(numberOperations.sumArrays([2, 2], [3]), [5, 2]);
        });

        it("Should work correctly when arrays are with equal length", function () {
            assert.deepEqual(numberOperations.sumArrays([2, 2], [3, 3]), [5, 5]);
        });

        it("Should work correctly with negative numbers", function () {
            assert.deepEqual(numberOperations.sumArrays([-2, 2], [3, -3, 5]), [1, -1, 5]);
        });
    });
});