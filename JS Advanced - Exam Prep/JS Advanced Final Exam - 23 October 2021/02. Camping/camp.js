class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = { "child": 150, "student": 300, "collegian": 500 };
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        money = Number(money);
        if (condition !== "child" && condition !== "student" && condition !== "collegian") {
            throw new Error(`Unsuccessful registration at the camp.`);
        }

        if (this.listOfParticipants.find(x => x.name == name)) {
            return `The ${name} is already registered at the camp.`;        
        }

        if (this.priceForTheCamp[condition] > money) {
            return `The money is not enough to pay the stay at the camp.`;
        }

        let person = { name, condition, power: 100, wins: 0 };
        this.listOfParticipants.push(person);

        return `The ${name} was successfully registered.`;
    }

    unregisterParticipant(name) {
        let targetParticipant = this.listOfParticipants.find(x => x.name == name);

        if (!targetParticipant) {
            throw new Error(`The ${name} is not registered in the camp.`);
        }

        let index = this.listOfParticipants.indexOf(targetParticipant);
        this.listOfParticipants.splice(index, 1);

        return `The ${name} removed successfully.`;
    }

    timeToPlay(typeOfGame, ...args) {
        let participant1 = this.listOfParticipants.find(x => x.name == args[0]);

        if (typeOfGame === 'WaterBalloonFights') {
            let participant2 = this.listOfParticipants.find(x => x.name == args[1]);

            if (!participant1 || !participant2) {
                throw new Error(`Invalid entered name/s.`);
            }

            if (participant1.condition !== participant2.condition) {  // Must have even conditions
                throw new Error(`Choose players with equal condition.`);
            }

            let winner = '';

            if (participant1.power > participant2.power) {
                participant1.wins++;
                winner = participant1.name;
            } else if (participant1.power < participant2.power) {
                participant2.wins++;
                winner = participant2.name;
            } else {
                return `There is no winner.`;
            }

            return `The ${winner} is winner in the game WaterBalloonFights.`;

        } else if (typeOfGame === 'Battleship') {
            if (!participant1) {
                throw new Error(`Invalid entered name/s.`);
            }
            participant1.power += 20;

            return `The ${args[0]} successfully completed the game Battleship.`;
        }
    }

    toString() {
        let message = `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}\n`;
        this.listOfParticipants.sort((x, y) => y.wins - x.wins);
        let participants = this.listOfParticipants.map(x => `${x.name} - ${x.condition} - ${x.power} - ${x.wins}`).join('\n');

        return message += participants;
    }
}

//const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 200));
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.registerParticipant("Leila Wolfe", "childd", 200));

// const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.unregisterParticipant("Petar"));
// console.log(summerCamp.unregisterParticipant("Petar Petarson"));

// const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
// console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300));
// console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson"));
// console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson"));
// console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300));
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov"));

const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.registerParticipant("Petar Petarson", "child", 300));
console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200));
console.log(summerCamp.timeToPlay("Battleship", "Sara Dickinson"));

console.log(summerCamp.timeToPlay("WaterBalloonFights", "Sara Dickinson", "Petar Petarson"));
console.log(summerCamp.toString());
