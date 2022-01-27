let { assert } = require('chai');
let library = require('./library');

describe("App", function () {
    describe("calcPriceOfBook ", function () {
        it("Should throw an error if the first parameter is a non-string", function () {
            assert.throws(function () { library.calcPriceOfBook(6, 1995) }, Error, "Invalid input");
            assert.throws(function () { library.calcPriceOfBook({}, 1995) }, Error, "Invalid input");
            assert.throws(function () { library.calcPriceOfBook([], 1995) }, Error, "Invalid input");
        });

        it("Should throw an error if the second parameter is not a number", function () {
            assert.throws(function () { library.calcPriceOfBook('The Witcher', 'text') }, Error, "Invalid input");
            assert.throws(function () { library.calcPriceOfBook('The Witcher', {}) }, Error, "Invalid input");
            assert.throws(function () { library.calcPriceOfBook('The Witcher', []) }, Error, "Invalid input");
        });

        it("Should return a specific message if the year is bellow or equal to 1980", function () {
            let book = library.calcPriceOfBook('Constantinople', 1453);
            let book2 = library.calcPriceOfBook('The Name of the Rose', 1980);  // Border case
            assert.equal(book, `Price of Constantinople is 10.00`);
            assert.equal(book2, `Price of The Name of the Rose is 10.00`);
        });

        it("Should return a specific message if the year is above 1980", function () {
            let book = library.calcPriceOfBook('The Witcher', 1993);
            assert.equal(book, `Price of The Witcher is 20.00`);
        });
    });

    describe("findBook ", function () {
        it("Should throw an error if the passed array is empty", function () {
            assert.throws(function () { library.findBook([], 'L.O.T.R') }, Error, "No books currently available");
        });

        it("Should return the desired book", function () {
            let check = library.findBook(['The Witcher', 'L.O.T.R'], 'L.O.T.R');
            assert.equal(check, "We found the book you want.");
        });

        it("Should return a message if the book is not found", function () {
            let check = library.findBook(['The Witcher', 'L.O.T.R'], 'VINETU');
            assert.equal(check, "The book you are looking for is not here!");
        });
    });

    describe("arrangeTheBooks ", function () {
        it("Should throw an error if the passed parameter is not a number or bellow zero", function () {
            assert.throws(function () { library.arrangeTheBooks(-1) }, Error, "Invalid input");
            assert.throws(function () { library.arrangeTheBooks({}) }, Error, "Invalid input");
            assert.throws(function () { library.arrangeTheBooks([]) }, Error, "Invalid input");
            assert.throws(function () { library.arrangeTheBooks('test') }, Error, "Invalid input");
        });

        it("Should arrange the books succesfully", function () {
            let arrange = library.arrangeTheBooks(5);
            let arrange2 = library.arrangeTheBooks(40);  // Border case
            assert.equal(arrange, "Great job, the books are arranged.");
            assert.equal(arrange2, "Great job, the books are arranged.");
        });

        it("Should return a message if there isn't enough space", function () {
            let arrange = library.arrangeTheBooks(100);
            assert.equal(arrange, "Insufficient space, more shelves need to be purchased.");
        });

    });

});