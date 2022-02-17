let { assert } = require('chai');
const dealership = require('./app.js');

describe("App", function () {
    describe("newCarCost", function () {
        it("Should work fine with test for every model", function () {
            let oldModel = 'Audi A4 B8';
            assert.equal(dealership.newCarCost(oldModel, 20000), 5000);
        });

        it("Should work fine with test for every model", function () {
            let oldModel = 'Audi A6 4K';
            assert.equal(dealership.newCarCost(oldModel, 30000), 10000);
        });

        it("Should work fine with test for every model", function () {
            let oldModel = 'Audi A8 D5';
            assert.equal(dealership.newCarCost(oldModel, 50000), 25000);
        });

        it("Should work fine with test for every model", function () {
            let oldModel = 'Audi TT 8J';
            assert.equal(dealership.newCarCost(oldModel, 20000), 6000);
        });

        it("Should return the second parameter if the model is not found", function () {
            assert.equal(dealership.newCarCost('Kraz', 20000), 20000);
        });
    });

    describe("carEquipment", function () {
        it("Should return the wanted extras, from the indexes of the second parameter", function () {
            assert.deepEqual(dealership.carEquipment(['Flying', 'Grenades', 'MachineGun'], [0, 1]), ['Flying', 'Grenades']);
        });

        it("Should return all the wanted extras", function () {
            assert.deepEqual(dealership.carEquipment(['Flying', 'Grenades', 'MachineGun'], [0, 1, 2]), ['Flying', 'Grenades', 'MachineGun']);
        });
    });

    describe("euroCategory", function () {
        it("Should return that our car is old as f*ck", function () {
            assert.equal(dealership.euroCategory(1), 'Your euro category is low, so there is no discount from the final price!');
        });

        it("Should calculate a discount and return a positive message", function () {
            assert.equal(dealership.euroCategory(5), `We have added 5% discount to the final price: ${14250}.`);
        });

        it("Should calculate a discount and return a positive message", function () {
            assert.equal(dealership.euroCategory(4), `We have added 5% discount to the final price: ${14250}.`);
        });
    });
});