let { assert } = require('chai');
let cinema = require('./cinema.js');

describe("App", function () {
    describe("showMovies", function () {
        it("Should return a specific message if the passed array is empty", function () {
            assert.equal(cinema.showMovies([]), "There are currently no movies to show.");
        });

        it("Should return the movies", function () {
            let arr = (['Venom', 'Eternals']);
            assert.equal(cinema.showMovies(arr), 'Venom, Eternals');
        });
    });

    describe("ticketPrice", function () {
        it("Should throw an error if the passed parameter is Not on the schedule", function () {
            assert.throws(function () { cinema.ticketPrice('Test') }, Error, 'Invalid projection type.');
        });

        it("Should return the right price depending on the parameter", function () {
            assert.equal(cinema.ticketPrice('Premiere'), '12.00');
            assert.equal(cinema.ticketPrice('Normal'), '7.50');
            assert.equal(cinema.ticketPrice('Discount'), '5.50');
        });
    });

    describe("swapSeatsInHall", function () {
        it("Should return a specific message if the parameters are NaN", function () {
            assert.equal(cinema.swapSeatsInHall('test', 2), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(2, 'test'), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall('test', 'test'), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(['test'], 2), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(2, ['test']), "Unsuccessful change of seats in the hall.");
        });

        it("Should return a specific message if the parameters are less or equal to Zero", function () {
            assert.equal(cinema.swapSeatsInHall(-2, 2), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(2, -2), "Unsuccessful change of seats in the hall.");

            assert.equal(cinema.swapSeatsInHall(2, 0), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(0, 2), "Unsuccessful change of seats in the hall.");
        });

        it("Should return a specific message if the parameters are larger than 20", function () {
            assert.equal(cinema.swapSeatsInHall(22, 2), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(2, 22), "Unsuccessful change of seats in the hall.");
        });

        it("Should return a specific message if the parameters are equal", function () {
            assert.equal(cinema.swapSeatsInHall(2, 2), "Unsuccessful change of seats in the hall.");
        });

        it("Should return a specific message if we try to execute the function with less parameters", function () {
            assert.equal(cinema.swapSeatsInHall(2), "Unsuccessful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(), "Unsuccessful change of seats in the hall.");
        });

        it("Should work correctly", function () {
            assert.equal(cinema.swapSeatsInHall(5, 10), "Successful change of seats in the hall.");
            assert.equal(cinema.swapSeatsInHall(20, 10), "Successful change of seats in the hall."); // Border case
            assert.equal(cinema.swapSeatsInHall(5, 20), "Successful change of seats in the hall."); // Border case
        });
    });
});