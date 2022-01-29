function employees(inputArr = []) {
    let people = [];
    for (let i = 0; i < inputArr.length; i++) {
        let current = inputArr[i];
        let info = {
            Name: current,
            PersonalNumb: current.length,
        };

        people.push(info);
    }
    for (const person of people) {
        console.log(`Name: ${person.Name} -- Personal Number: ${person.PersonalNumb}`);
    }
}

employees(['Silas Butler', 'Adnaan Buckley', 'Juan Peterson', 'Brendan Villarreal'])