function solve() {
    let hero = {};

    let resultObj = {
        mage: function (name) {
            hero["name"] = name;
            hero["health"] = 100;
            hero["mana"] = 100;
            hero.cast = function (spell) {
                hero.mana--;
                console.log(`${hero.name} cast ${spell}`)
            }

            return hero;
        },

        fighter: function (name) {
            hero["name"] = name;
            hero["health"] = 100;
            hero["stamina"] = 100;
            hero.fight = function () {
                hero.stamina--;
                console.log(`${hero.name} slashes at the foe!`)
            }

            return hero;
        }
    }

    return resultObj;
}

let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball")
scorcher.cast("thunder")
scorcher.cast("light")
console.log(scorcher.health);

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight()

console.log(scorcher2.stamina);
console.log(scorcher.mana);
