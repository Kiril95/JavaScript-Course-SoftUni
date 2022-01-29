function solution(inputArr = []) {
    let result = {};
    let storage = {};

    for (const info of inputArr) {
        let [fruit, value] = info.split(' => ');
        value = Number(value);

        if (!storage[fruit]) {
            storage[fruit] = value;
        } else {
            storage[fruit] += value;
        }

        let currentFruitValue = storage[fruit];
        if (currentFruitValue >= 1000) {
            let bottles = Math.trunc(currentFruitValue / 1000);
            result[fruit] = bottles;
        }
    }

    Object.entries(result).forEach(([fruit, bottles]) => {
        console.log(`${fruit} => ${bottles}`);
    });
}

// solution(['Orange => 2000',
//     'Peach => 1432',
//     'Banana => 450',
//     'Peach => 600',
//     'Strawberry => 549'])

solution(['Kiwi => 234',
    'Pear => 2345',
    'Watermelon => 3456',
    'Kiwi => 4567',
    'Pear => 5678',
    'Watermelon => 6789'])