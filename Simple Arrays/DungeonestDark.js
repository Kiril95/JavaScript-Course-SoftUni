function dungeon(array = []) {
    let operations = array[0].split("|");
    let health = 100;
    let coins = 0;
    let roomCounter = 0;

    for (let i = 0; i < operations.length; i++) {
        let splitted = operations[i].split(" ");
        let command = splitted[0];
        let number = Number(splitted[1]);
        roomCounter++;

        if (command == "potion") {
            if (health + number > 100) {
                number = 100 - health;
                health = 100;

            } else {
                health += number;
            }
            console.log(`You healed for ${number} hp.`);
            console.log(`Current health: ${health} hp.`);

        } else if (command === "chest") {
            foundCoins = number;
            coins += number;
            console.log(`You found ${foundCoins} coins.`);

        } else {
            health -= number;

            if (health > 0) {
                console.log(`You slayed ${command}.`);

            } else {
                console.log(`You died! Killed by ${command}.`);
                console.log(`Best room: ${roomCounter}`);
                return;
            }
        }
    }
    console.log(`You've made it!`);
    console.log(`Coins: ${coins}`);
    console.log(`Health: ${health}`);
}

dungeon(["rat 10|bat 20|potion 10|rat 10|chest 100|boss 70|chest 1000"]);
dungeon(["cat 10|potion 30|orc 10|chest 10|snake 25|chest 110"]);