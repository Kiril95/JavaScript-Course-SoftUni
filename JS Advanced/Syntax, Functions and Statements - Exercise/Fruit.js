function buy(type, grams, price) {
    let calc = grams * price / 1000;
    console.log(`I need $${calc.toFixed(2)} to buy ${(grams / 1000).toFixed(2)} kilograms ${type}.`);
}

buy('orange', 2500, 1.80)
buy('apple', 1563, 2.35)