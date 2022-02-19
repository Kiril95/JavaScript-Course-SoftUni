let { assert } = require('chai');
const flowerShop = require('./flowerShop.js');

describe("App", function () {
    describe("calcPriceOfFlowers", function () {
        it("Should throw an error if the first parameter is not a string or the others are NaN", function () {
            assert.throws(function () { flowerShop.calcPriceOfFlowers(2, 3, 4) }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.calcPriceOfFlowers(['test'], 3, 4) }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.calcPriceOfFlowers({}, 3, 4) }, Error, 'Invalid input!');

            assert.throws(function () { flowerShop.calcPriceOfFlowers('Test', 'test', 4) }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.calcPriceOfFlowers('Test', 4, 'test') }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.calcPriceOfFlowers('Test', 'test', 4) }, Error, 'Invalid input!');
        });

        it('Should work fine', () => {
            assert.equal(flowerShop.calcPriceOfFlowers('Edelweiss', 2, 2), `You need $4.00 to buy Edelweiss!`);
        });
    })

    describe("calcPriceOfFlowers", function () {
        it('Should work fine', () => {
            assert.equal(flowerShop.checkFlowersAvailable('Edelweiss', ['Edelweiss', 'test2']), `The Edelweiss are available!`);
            assert.equal(flowerShop.checkFlowersAvailable('Snowdrop', ['test', 'Snowdrop']), `The Snowdrop are available!`);
        });

        it('Should work fine', () => {
            assert.equal(flowerShop.checkFlowersAvailable('Jasmine', ['Edelweiss', 'Snowdrop']), `The Jasmine are sold! You need to purchase more!`);
            assert.equal(flowerShop.checkFlowersAvailable('Jasmine', ['Edelweiss']), `The Jasmine are sold! You need to purchase more!`);
        });
        
    })

    describe("sellFlowers", function () {
        it('Should work fine', () => {
            assert.equal(flowerShop.sellFlowers(['Jasmine', 'Edelweiss', 'Snowdrop'], 1), 'Jasmine / Snowdrop');
        });

        it("Should throw an error if the first param is not an Array or the other is etc...", function () {
            let arr = ['Edelweiss', 'Snowdrop'];

            assert.throws(function () { flowerShop.sellFlowers(2, 2) }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.sellFlowers(arr, 2) }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.sellFlowers(arr, 3) }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.sellFlowers(arr, '4') }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.sellFlowers(arr, ['4']) }, Error, 'Invalid input!');
            assert.throws(function () { flowerShop.sellFlowers(arr, {}) }, Error, 'Invalid input!');
        });
    })
});