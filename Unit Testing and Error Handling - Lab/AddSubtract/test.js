const { expect, assert } = require('chai');
const createCalculator = require('./AddSubtract');

describe('App', function () {
    it('Should return an object', function() {
        assert.typeOf(createCalculator(), 'object');
    })

    it('Should have the provided methods', () => {
        const calculator = createCalculator();

        assert.property(calculator, 'add');
        assert.property(calculator, 'subtract');
        assert.property(calculator, 'get');
    });

    it('Should sum the numbers correctly', function () {
        const calculator = createCalculator();
        calculator.add(6);
        assert.equal(calculator.get(), 6);
    });

    it('Should subtract the numbers correctly', function () {
        const calculator = createCalculator();
        calculator.add(6);
        calculator.subtract(4);
        assert.equal(calculator.get(), 2);
    });

    it('Should return NaN if passed a non-number', function () {
        const calculator = createCalculator();
        calculator.add('A');
        assert.isNaN(calculator.get(), true);
    });

    it('Should return NaN if passed a non-number', function () {
        const calculator = createCalculator();
        calculator.subtract('B');
        assert.isNaN(calculator.get(), true);
    });

});