let { assert } = require('chai');
const ChristmasMovies = require('./movies.js');

describe("App", function () {
    describe("buyMovie", function () {
        it("Constructor should work fine", function () {
            let obj = new ChristmasMovies();

            assert.instanceOf(obj, ChristmasMovies);
            assert.typeOf(obj, 'object');
            assert.deepEqual(obj.movieCollection, []);
            assert.deepEqual(obj.watched, {});
            assert.deepEqual(obj.actors, []);
        });

        it('Should work fine', () => {
            let obj = new ChristmasMovies();
            let message = `You just got Eternals to your collection in which Peshko are taking part!`;
            obj.buyMovie('Venom', ['Peshko']);

            assert.equal(message, `You just got Eternals to your collection in which Peshko are taking part!`);
        });

        it("Should throw an error if we try to buy a movie that we have", function () {
            let obj = new ChristmasMovies();
            obj.movieCollection.push({ name: 'Venom' });

            assert.throws(function () { obj.buyMovie('Venom', ['Some']) }, Error, `You already own Venom in your collection!`);
        });

        it("Should add the movie to our collection", function () {
            let obj = new ChristmasMovies();
            let message = `You just got Eternals to your collection in which Peshko are taking part!`;
            obj.buyMovie('Eternals', ['Peshko']);

            assert.equal(message, `You just got Eternals to your collection in which Peshko are taking part!`);
        });

        it("Should add the movie to our collection", function () {
            let obj = new ChristmasMovies();
            let message = `You just got Eternals to your collection in which Peshko, Goshko are taking part!`;
            obj.buyMovie('Eternals', ['Peshko', 'Goshko']);

            assert.equal(message, `You just got Eternals to your collection in which Peshko, Goshko are taking part!`);
        });

        it("Should add the movie and filter the actors with the same name", function () {
            let obj = new ChristmasMovies();
            obj.buyMovie('Eternals', ['Peshko', 'Peshko', 'Goshko']);

            assert.deepEqual(obj.movieCollection, [{ name: 'Eternals', actors: ['Peshko', 'Goshko'] }]);
        });
    });

    describe("discardMovie", function () {
        it("Should throw an error if we dont have the movie for deletion", function () {
            let obj = new ChristmasMovies();

            assert.throws(function () { obj.discardMovie('Test') }, Error, `Test is not at your collection!`);
        });

        it("Should throw an error if we haven't watched the movie", function () {
            let obj = new ChristmasMovies();
            obj.movieCollection.push({ name: 'Venom', actors: ['Tom Hardy'] });

            assert.throws(function () { obj.discardMovie('Venom') }, Error, `Venom is not watched!`);
        });

        it("Should discard the movie", function () {
            let obj = new ChristmasMovies();
            obj.buyMovie('Venom', ['Tom Hardy']);
            obj.watchMovie('Venom');

            assert.deepEqual(obj.discardMovie('Venom'), `You just threw away Venom!`);
            assert.deepEqual(obj.movieCollection, []);
        });
    });

    describe("watchMovie", function () {
        it("Should throw an error if we want to watch a movie that is not in the collection", function () {
            let obj = new ChristmasMovies();

            assert.throws(function () { obj.watchMovie('Test') }, Error, 'No such movie in your collection!');
        });

        it("Should add another point to a movie", function () {
            let obj = new ChristmasMovies();
            obj.buyMovie('Venom', ['Tom Hardy']);
            obj.watchMovie('Venom');
            obj.watchMovie('Venom');

            assert.equal(obj.watched['Venom'], 2);
        });

        it("Should add the movie to the watched list", function () {
            let obj = new ChristmasMovies();
            obj.buyMovie('Venom', ['Tom Hardy']);
            obj.watchMovie('Venom');

            assert.equal(obj.watched['Venom'], 1);
        });
    });

    describe("favouriteMovie", function () {
        it("Should throw an error if we dont have any watched movies", function () {
            let obj = new ChristmasMovies();

            assert.throws(function () { obj.favouriteMovie() }, Error, 'You have not watched a movie yet this year!');
        });

        it("Should show us our favourite movie", function () {
            let obj = new ChristmasMovies();
            obj.buyMovie('Venom', ['Tom Hardy']);
            obj.watchMovie('Venom');

            assert.equal(obj.favouriteMovie(), `Your favourite movie is Venom and you have watched it 1 times!`);
        });

        it("Should show us our favourite movie but with more movies watched", function () {
            let obj = new ChristmasMovies();
            obj.buyMovie('Venom', ['Tom Hardy']);
            obj.watchMovie('Venom');

            obj.buyMovie('Eternals', ['Kit Harrington']);
            obj.watchMovie('Eternals');

            obj.buyMovie('L.O.T.R', ['Orlando Bloom']);
            obj.watchMovie('L.O.T.R');
            obj.watchMovie('L.O.T.R');

            assert.equal(obj.favouriteMovie(), `Your favourite movie is L.O.T.R and you have watched it 2 times!`);
        });
    });

    describe("mostStarredActor", function () {
        it("Should throw an error if we dont have any movies in our collection", function () {
            let obj = new ChristmasMovies();

            assert.throws(function () { obj.mostStarredActor() }, Error, 'You have not watched a movie yet this year!');
        });

        it("Should show us the best actor with only one movie", function () {
            let obj = new ChristmasMovies();
            obj.movieCollection.push({ name: 'Venom', actors: ['Tom Hardy'] });
            
            assert.equal(obj.mostStarredActor(), `The most starred actor is Tom Hardy and starred in 1 movies!`);
        });

        it("Should get the best actor in order of assertion, because they will have equal stars", function () {
            let obj = new ChristmasMovies();
            obj.movieCollection.push({ name: 'Venom', actors: ['Woody Harrelson', 'Tom Hardy'] });
            
            assert.equal(obj.mostStarredActor(), `The most starred actor is Woody Harrelson and starred in 1 movies!`);
        });

        it("Should get the best actor, whom have participated in multiple movies", function () {
            let obj = new ChristmasMovies();
            obj.movieCollection.push({ name: 'Venom', actors: ['Woody Harrelson', 'Tom Hardy'] });
            obj.movieCollection.push({ name: 'Inception', actors: ['Tom Hardy'] });
            obj.movieCollection.push({ name: 'The Dark Knight Rises', actors: ['Tom Hardy', 'Some'] });
            
            assert.equal(obj.mostStarredActor(), `The most starred actor is Tom Hardy and starred in 3 movies!`);
        });
    });

});