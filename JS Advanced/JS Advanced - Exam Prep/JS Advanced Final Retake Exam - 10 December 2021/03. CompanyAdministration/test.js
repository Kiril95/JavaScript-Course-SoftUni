let { assert } = require('chai');
let companyAdministration = require('./companyAdministration.js');

describe("App", function () {
    describe("hiringEmployee", function () {
        it("Should throw an error if the position parameter is no 'Programmer'", function () {
            assert.throws(function () { companyAdministration.hiringEmployee('Kiko', 'Astronaut', 20) }, Error, `We are not looking for workers for this position.`);
        });

        it("Should return a specific message when the experience is more or equal to 3", function () {
            assert.equal(companyAdministration.hiringEmployee('Kiko', 'Programmer', 10), `Kiko was successfully hired for the position Programmer.`);
            assert.equal(companyAdministration.hiringEmployee('Kiko', 'Programmer', 3), `Kiko was successfully hired for the position Programmer.`); // Border case
        }); 

        it("Should return a specific message when the experience is less than 3", function () {
            assert.equal(companyAdministration.hiringEmployee('Kiko', 'Programmer', 1), `Kiko is not approved for this position.`);
        }); 
    });

    describe("calculateSalary", function () {
        it("Should throw an error if the input is NaN or less than 0", function () {
            assert.throws(function () { companyAdministration.calculateSalary(-2) }, Error, "Invalid hours");
            assert.throws(function () { companyAdministration.calculateSalary('test') }, Error, "Invalid hours");
            assert.throws(function () { companyAdministration.calculateSalary({}) }, Error, "Invalid hours");
            assert.throws(function () { companyAdministration.calculateSalary(['test']) }, Error, "Invalid hours");
        });

        it("Should return the calculated salary, plus the bonus if the hours are more than 160", function () {
            assert.equal(companyAdministration.calculateSalary(180), 3700);
        }); 

        it("Should return the calculated salary", function () {
            assert.equal(companyAdministration.calculateSalary(156), 2340);
        });

    });

    describe("firedEmployee", function () {
        it("Should throw an error if first param is not an Array", function () {
            assert.throws(function () { companyAdministration.firedEmployee('test', 2) }, Error, "Invalid input");
            assert.throws(function () { companyAdministration.firedEmployee(2, 2) }, Error, "Invalid input");
            assert.throws(function () { companyAdministration.firedEmployee({}, 2) }, Error, "Invalid input");
        });

        it("Should throw an error if the index is NaN", function () {
            assert.throws(function () { companyAdministration.firedEmployee(['Kircho', 'Goshko'], 'test') }, Error, "Invalid input");
            assert.throws(function () { companyAdministration.firedEmployee(['Kircho', 'Goshko'], ['test']) }, Error, "Invalid input");
            assert.throws(function () { companyAdministration.firedEmployee(['Kircho', 'Goshko'], {}) }, Error, "Invalid input");
        });

        it("Should throw an error if the index is less than zero", function () {
            assert.throws(function () { companyAdministration.firedEmployee(['Kircho', 'Goshko'], -1) }, Error, "Invalid input");
        });

        it("Should throw an error if the index is outside the bounds of the Array", function () {
            assert.throws(function () { companyAdministration.firedEmployee(['Kircho', 'Goshko'], 2) }, Error, "Invalid input");
            assert.throws(function () { companyAdministration.firedEmployee(['Kircho', 'Goshko'], 10) }, Error, "Invalid input");
        });

        it("Should remove the targeted employee", function () {
            assert.equal(companyAdministration.firedEmployee(['Kircho', 'Peshko'], 1), 'Kircho');
            assert.equal(companyAdministration.firedEmployee(['Kircho', 'Goshko', 'Boko', 'Kasketa'], 2), 'Kircho, Goshko, Kasketa');
        });
    });
});