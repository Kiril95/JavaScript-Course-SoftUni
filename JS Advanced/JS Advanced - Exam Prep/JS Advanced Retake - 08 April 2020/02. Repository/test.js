let { assert } = require('chai');
let { Repository } = require("./solution.js");

describe("App", function () {
    let repo = undefined;
    let props = { name: 'string', age: 'number', birthday: "object" };
    entity = { name: 'Kiko', age: 26, birthday: new Date(1995, 13, 08) };
    
    beforeEach(function () {
        repo = new Repository(props);
    });

    describe("Constructor", function () {
        it("Constructor should work fine", function () {
            assert.instanceOf(repo, Repository);
            assert.typeOf(repo, 'object');
            assert.deepEqual(repo.data, new Map);
            assert.equal(repo.nextId(), 0);
        });
    });

    describe("Add", function () {
        it("Should throw an error if we are trying to set a value to a non-existent property", function () {
            assert.throws(function () { repo.add({ name: 'Kiko', town: 'Sofia', birthday: new Date(1995, 13, 08) }) }, Error, `Property age is missing from the entity!`);
        });

        it("Should throw an error if we are trying to set a value with a wrong type", function () {
            assert.throws(function () { repo.add({ name: ['test'], age: 26, birthday: new Date(1995, 13, 08) }) }, TypeError, `Property name is not of correct type!`);
            assert.throws(function () { repo.add({ name: 'Kiko', age: 'test', birthday: new Date(1995, 13, 08) }) }, TypeError, `Property age is not of correct type!`);
        });

        it('Should return the right index', () => {
            repo.add(entity);
            let info = repo.data.get(0); // Check if it was succesfull

            assert.deepEqual(info, { name: 'Kiko', age: 26, birthday: new Date(1995, 13, 08) });
        });

        it('Should return the right index', () => {
            assert.equal(repo.add(entity), 0);
        });

        it('Should return the right index with multiple additions', () => {
            repo.add(entity);
            assert.equal(repo.add({ name: 'Test', age: 26, birthday: new Date(1995, 13, 08) }), 1);
        });
    });

    describe("GetId", function () {
        it("Should throw an error if we are trying to get info on a non-existent index", function () {
            assert.throws(function () { repo.getId(0) }, Error, `Entity with id: 0 does not exist!`);
        });

        it("Should throw an error if we are trying to get info on a non-existent index", function () {
            repo.add(entity);
            assert.throws(function () { repo.getId(1) }, Error, `Entity with id: 1 does not exist!`);
        });

        it('Should return the right object at the given index', () => {
            repo.add(entity);
            assert.deepEqual(repo.getId(0), { name: 'Kiko', age: 26, birthday: new Date(1995, 13, 08) });
        });
    });

    describe("Update", function () {
        it("Should throw an error if we are trying to update info on a non-existent index", function () {
            assert.throws(function () { repo.update(0, { name: 'test' }) }, Error, `Entity with id: 0 does not exist!`);
        });

        it("Should throw an error if we are trying to set a value to a non-existent property", function () {
            repo.add(entity);
            assert.throws(function () { repo.update(0, { name: 'Kiko', town: 'Sofia', birthday: new Date(1995, 13, 08) }) }, Error, `Property age is missing from the entity!`);
        });

        it("Should throw an error if we are trying to set a value with a wrong type", function () {
            repo.add(entity);

            assert.throws(function () { repo.update(0, { name: ['test'], age: 18, birthday: new Date(1995, 13, 08) }) }, TypeError, `Property name is not of correct type!`);
            assert.throws(function () { repo.update(0, { name: 'Kik', age: 'test', birthday: new Date(1995, 13, 08) }) }, TypeError, `Property age is not of correct type!`);
        });

        it('Should succesfully update entity!', () => {
            repo.add(entity);
            repo.update(0, { name: 'Kirchaka', age: 20, birthday: new Date(1994, 13, 08) })
            let info = repo.data.get(0);

            assert.deepEqual(info, { name: 'Kirchaka', age: 20, birthday: new Date(1994, 13, 08) });
        });
    });

    describe("Delete", function () {
        it("Should throw an error if we are trying to delete an entity on a non-existent index", function () {
            assert.throws(function () { repo.del(0) }, Error, `Entity with id: 0 does not exist!`);
        });

        it("Should delete the entity at the given index", function () {
            repo.add(entity);
            repo.del(0);

            assert.equal(repo.count, 0);
        });

        it('delete method should work properly', () => {
            repo.add({ name: "Peshko", age: 5, birthday: new Date(1992, 1, 7) });
            repo.add({ name: "Peshko", age: 6, birthday: new Date(1993, 2, 7) });
            repo.add({ name: "Peshko", age: 5, birthday: new Date(1994, 2, 7) });

            repo.del(2);
            
            assert.deepEqual(repo.data.get(0), { name: "Peshko", age: 5, birthday: new Date(1992, 1, 7) });
            assert.deepEqual(repo.data.get(1), { name: "Peshko", age: 6, birthday: new Date(1993, 2, 7) });
        });

    });
});