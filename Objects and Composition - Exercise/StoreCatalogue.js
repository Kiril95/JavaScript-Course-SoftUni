function solve(inputArr = []) {
    let resultObj = {};

    for (const info of inputArr) {
        let [name, price] = info.split(" : ");
        let firstLetter = name[0];

        if (!resultObj[firstLetter]) {
            resultObj[firstLetter] = [];
        }
        resultObj[firstLetter].push({ name, price })
    }

    for (const letter of Object.keys(resultObj).sort((x, y) => x.localeCompare(y))) {
        console.log(letter);
        resultObj[letter].sort((a, b) => (a.name).localeCompare(b.name));

        for (const kvp of resultObj[letter]) {
            console.log(`  ${kvp.name}: ${kvp.price}`);
        }
    }
}

solve(['Appricot : 20.4',
    'Fridge : 1500',
    'TV : 1499',
    'Deodorant : 10',
    'Boiler : 300',
    'Apple : 1.25',
    'Anti-Bug Spray : 15',
    'T-Shirt : 10'])