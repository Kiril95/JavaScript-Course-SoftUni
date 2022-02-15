let { assert } = require('chai');
const testNumbers = require('./testNumbers.js');

describe("App", function () {
    describe("sumNumbers", function () {
        it("Should return undefined if the parameters are not numbers", function () {
            assert.equal(testNumbers.sumNumbers('test', 2), undefined);
            assert.equal(testNumbers.sumNumbers(2, 'test'), undefined);
            assert.equal(testNumbers.sumNumbers('test', 'test'), undefined);
            assert.equal(testNumbers.sumNumbers(['test'], 2), undefined);
            assert.equal(testNumbers.sumNumbers(2, ['test']), undefined);
            assert.equal(testNumbers.sumNumbers({}, 2), undefined);
            assert.equal(testNumbers.sumNumbers(2, {}), undefined);
        });

        it("Should sum correctly with positive and negative values", function () {
            assert.equal(testNumbers.sumNumbers(2, 2), 4.00);
            assert.equal(testNumbers.sumNumbers(-2, 5), 3.00);
            assert.equal(testNumbers.sumNumbers(-2, -2), -4.00);
            assert.equal(testNumbers.sumNumbers(-2, 2), 0.00);
        });    
    })

    describe("numberChecker", function () {
        it("Should throw an error if the input is NaN", function () {
            assert.throws(function () { testNumbers.numberChecker('Test') }, Error, 'The input is not a number!');
            assert.throws(function () { testNumbers.numberChecker({}) }, Error, 'The input is not a number!');
            assert.throws(function () { testNumbers.numberChecker(['test']) }, Error, 'The input is not a number!');
        });

        it("Should say that the number is even", function () {
            assert.equal(testNumbers.numberChecker(2), 'The number is even!');
        }); 

        it("Should say that the number is odd", function () {
            assert.equal(testNumbers.numberChecker(3), 'The number is odd!');
        }); 
    })

    describe("averageSumArray", function () {
        it("Should calculate average correctly", function () {
            assert.equal(testNumbers.averageSumArray([2, 2, 2]), 2);
        }); 
    })
});