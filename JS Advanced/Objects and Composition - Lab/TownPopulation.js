function solve(inputArr = []) {
    let resultObj = {};
    for (let pair of inputArr) {
        let [town, population] = pair.split(" <-> ");

        if (resultObj.hasOwnProperty(town)) {
            resultObj[town] += Number(population);
        } else {
            resultObj[town] = Number(population);
        }
    }

    for (let [key, value] of Object.entries(resultObj)) {
        console.log(`${key} : ${value}`);
    }
}

solve(
    ['Istanbul <-> 100000',
        'Honk Kong <-> 2100004',
        'Jerusalem <-> 2352344',
        'Mexico City <-> 23401925',
        'Istanbul <-> 1000'
    ])