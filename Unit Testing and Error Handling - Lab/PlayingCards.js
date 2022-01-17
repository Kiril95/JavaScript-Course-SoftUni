function factory(face, suit) {
    let faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', 'S', 'H', 'D', 'C'];
    let suits = {
        S: '\u2660',
        H: '\u2665',
        D: '\u2666',
        C: '\u2663'
    }

    if (!faces.includes(face) || !faces.includes(suit)) {
        throw new Error;
    }

    let cardObj = {
        face: face,
        suit: suits[suit],
        toString: function () {
            return `${this.face}${this.suit}`;
        }
    }

    return cardObj;
}

console.log(factory('A', 'S').toString())
console.log(factory('10', 'H').toString())
console.log(factory('J', 'D').toString())
console.log(factory('1', 'C').toString())