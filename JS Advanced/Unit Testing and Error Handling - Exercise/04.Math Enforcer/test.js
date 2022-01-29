let { assert } = require('chai');
let mathEnforcer = require('./MathEnforcer');

describe('App', function () {
    describe('addFive', function () {
        it('Should return undefined if a non-number parameter is passed', function () {
            assert.equal(mathEnforcer.addFive('str'), undefined);
            assert.equal(mathEnforcer.addFive({}), undefined);
            assert.equal(mathEnforcer.addFive([1, 2]), undefined);
            assert.equal(mathEnforcer.addFive(true), undefined);
            assert.equal(mathEnforcer.addFive(false), undefined);
        });

        it('Should calculate correctly with positive numbers', function () {
            assert.equal(mathEnforcer.addFive(10), 15);
        });

        it('Should calculate correctly with negative numbers', function () {
            assert.equal(mathEnforcer.addFive(-2), 3);
        });

        it('Should calculate correctly with floating point numbers', function () {
            assert.closeTo(mathEnforcer.addFive(5.555), 10.55, 0.01);
        });
    });

    describe('subtractTen', function () {
        it('Should return undefined if a non-number parameter is passed', function () {
            assert.equal(mathEnforcer.subtractTen('str'), undefined);
            assert.equal(mathEnforcer.subtractTen({}), undefined);
            assert.equal(mathEnforcer.subtractTen([1, 2]), undefined);
            assert.equal(mathEnforcer.subtractTen(true), undefined);
            assert.equal(mathEnforcer.subtractTen(false), undefined);
        });

        it('Should subtract correctly with positive numbers', function () {
            assert.equal(mathEnforcer.subtractTen(10), 0);
        });

        it('Should subtract correctly with negative numbers', function () {
            assert.equal(mathEnforcer.subtractTen(-10), -20);
        });

        it('Should subtract correctly with floating point numbers', function () {
            assert.closeTo(mathEnforcer.subtractTen(-5.55), -15.55, 0.01);
        });
    });

    describe('sum', function () {
        it('Should return undefined if a non-number parameter is passed', function () {
            assert.equal(mathEnforcer.sum('str', 1), undefined);
            assert.equal(mathEnforcer.sum({}, 1), undefined);
            assert.equal(mathEnforcer.sum([1, 2], 1), undefined);
            assert.equal(mathEnforcer.sum(true, 1), undefined);
            assert.equal(mathEnforcer.sum(false, 1), undefined);

            assert.equal(mathEnforcer.sum(1, 'str'), undefined);
            assert.equal(mathEnforcer.sum(1, {}), undefined);
            assert.equal(mathEnforcer.sum(1, [1, 2]), undefined);
            assert.equal(mathEnforcer.sum(1, true), undefined);
            assert.equal(mathEnforcer.sum(1, false), undefined);
        });

        it('Should sum correctly with positive numbers', function () {
            assert.equal(mathEnforcer.sum(10, 10), 20);
        });

        it('Should sum correctly with negative numbers', function () {
            assert.equal(mathEnforcer.sum(-5, -5), -10);
        });

        it('Should sum correctly with floating point numbers', function () {
            assert.closeTo(mathEnforcer.sum(5.55, 5.55), 11.1, 0.01);
        });
    });

})