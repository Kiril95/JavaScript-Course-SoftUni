// Constructor function
function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    Object.defineProperty(this, 'fullName', {
        get() {
            return `${this.firstName} ${this.lastName}`;
        },
        set(arg) {
            let [first, last] = arg.split(' ');
            if (first != undefined && last != undefined) {
                this.firstName = first;
                this.lastName = last;
            }
        },
        enumerable: true,
    })
}

// Class constructor
// class Person {
//     constructor(firstName, lastName) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.fullName = '';
//     }

//     get fullName() {
//         return `${this.firstName} ${this.lastName}`;
//     }
//     set fullName(arg) {
//         let [first, last] = arg.split(' ');
//         if (first != undefined && last != undefined) {
//             this.firstName = first;
//             this.lastName = last;
//         }
//     }
// }

let person = new Person("Peter", "Ivanov");
console.log(person.fullName); //Peter Ivanov
person.firstName = "George";
console.log(person.fullName); //George Ivanov
person.lastName = "Peterson";
console.log(person.fullName); //George Peterson
person.fullName = "Nikola Tesla";
console.log(person.firstName); //Nikola
console.log(person.lastName); //Tesla