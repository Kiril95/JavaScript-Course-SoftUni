function game(inputArr = []) {
    let heroes = [];

    for (let line of inputArr) {
        let heroDetails = line.split(' / ');
        let heroName = heroDetails[0];
        let heroLevel = Number(heroDetails[1]);
        let heroItems = heroDetails[2]
            .split(', ')
            .sort((x, y) => x.localeCompare(y))
            .join(", ");

        let hero = {
            name: heroName,
            level: heroLevel,
            items: heroItems
        }
        heroes.push(hero);
    }
    let sortedAscending = heroes.sort((a, b) => a.level - b.level);

    for (let hero of sortedAscending) {
        console.log(`Hero: ${hero.name}`);
        console.log(`level => ${hero.level}`);
        console.log(`items => ${hero.items}`);
    }
}

game([
    'Isacc / 25 / Apple, GravityGun',
    'Derek / 12 / BarrelVest, DestructionSword',
    'Hes / 1 / Desolator, Sentinel, Antara'
])