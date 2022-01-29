function catalog(inputArr = []) {
    let obj = {};

    for (let i = 0; i <= inputArr.length - 1; i++) {
        let line = inputArr[i];
        let [product, price] = line.split(' : ');
        price = Number(price);
        if (!obj.hasOwnProperty(product)) {
            obj[product] = price;
        }
    }

    let entries = Object.entries(obj);
    let sortedEntries = entries.sort((a, b) => a[0].localeCompare(b[0]));
    let resultArr = [];

    for (let [key, value] of sortedEntries) {
        if (!resultArr.includes(key.substring(0, 1))) {
            resultArr.push(key.substring(0, 1));
        }
    }

    for (let letter of resultArr) {
        console.log(letter);
        for (let [key, value] of sortedEntries) {
            if (key.startsWith(letter)) {
                console.log(`  ${key}: ${value}`);
            }
        }
    }
}

catalog([
    'Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10']);