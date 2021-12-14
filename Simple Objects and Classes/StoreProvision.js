function shop(firstArr = [], secondArr = []) {
    let products = {};

    for (let i = 0; i < firstArr.length; i++) {
        if (i % 2 === 0) {
            products[firstArr[i]] = null;
        }
        else if (i % 2 === 1) {
            products[firstArr[i - 1]] = Number(firstArr[i]);
        }
    }

    for (let i = 0; i < secondArr.length; i += 2) {
        if (!products.hasOwnProperty(secondArr[i])) {
            products[secondArr[i]] = null;
        }

        products[secondArr[i]] += Number(secondArr[i + 1]);
    }

    for (let [key, value] of Object.entries(products)) {
        console.log(`${key} -> ${value}`);
    }
}

shop(['Chips', '5', 'CocaCola', '9', 'Bananas', '14', 'Pasta', '4', 'Beer', '2'],
    ['Flour', '44', 'Oil', '12', 'Pasta', '7', 'Tomatoes', '70', 'Bananas', '30'])