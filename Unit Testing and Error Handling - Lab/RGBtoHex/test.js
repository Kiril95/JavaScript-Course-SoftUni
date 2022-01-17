const { expect, assert } = require('chai');
const rgbToHexColor = require('./RGBtoHex');

describe('App', function () {
    it('Should return undefined if any of the 3 inputs are not numbers', function () {
        assert.equal(rgbToHexColor(1, 2, 'blah'), undefined);
        assert.equal(rgbToHexColor(1, 'blah', 3), undefined);
        assert.equal(rgbToHexColor('blah', 2, 3), undefined);
    });

    it('Should return undefined if any of the 3 numbers are not in range [0 - 255]', function () {
        assert.equal(rgbToHexColor(1, 2, 333), undefined);
        assert.equal(rgbToHexColor(1, 2222, 3), undefined);
        assert.equal(rgbToHexColor(1111, 2, 3), undefined);
        
        assert.equal(rgbToHexColor(1, 2, -3), undefined);
        assert.equal(rgbToHexColor(1, -2, 3), undefined);
        assert.equal(rgbToHexColor(-1, 2, 3), undefined);
    });

    it('Should return the proper color variant', function () {
        assert.equal(rgbToHexColor(255, 0, 0), '#FF0000');
        assert.equal(rgbToHexColor(0, 255, 0), '#00FF00');
        assert.equal(rgbToHexColor(0, 0, 255), '#0000FF');
    });
});