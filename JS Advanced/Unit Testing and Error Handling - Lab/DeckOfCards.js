function printDeckOfCards(cards) {
    let result = [];
    for (const card of cards) {
        const face = card.slice(0, -1);
        const suit = card.slice(-1);

        try {
            result.push(createCard(face, suit));
        } catch (error) {
            console.log(`Invalid card: ${card}`);
            return;
        }
    }
    console.log(result.join(' '));

    function createCard(face, suit) {
        const faces = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A', 'S', 'H', 'D', 'C']
        const suits = {
            'S': '\u2660',
            'H': '\u2665',
            'D': '\u2666',
            'C': '\u2663'
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
}

printDeckOfCards(['AS', '10D', 'KH', '2C'])
printDeckOfCards(['5S', '3D', 'QD', '1C'])
