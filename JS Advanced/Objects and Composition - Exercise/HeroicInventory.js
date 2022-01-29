function solve(inputArr = []) {
    let resultArr = [];

    for (const info of inputArr) {
        let [name, level, items] = info.split(" / ");
        resultArr.push({
            name: name,
            level: Number(level),
            items: items ? items.split(', ') : []
        });
    }

    console.log(JSON.stringify(resultArr));
}

solve(['Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'])
