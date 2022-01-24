class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
    toString() {
        return `${this.constructor.name} (name: ${this.name}, email: ${this.email})`;
    }
}
class Student extends Person {
    constructor(name, email, course) {
        super(name, email)
        this.course = course;
    }
    toString() {
        return super.toString().substring(0, super.toString().length - 1) + `, course: ${this.course})`;
    }
}
class Teacher extends Person {
    constructor(name, email, subject) {
        super(name, email)
        this.subject = subject;
    }
    toString() {
        return super.toString().substring(0, super.toString().length - 1) + `, subject: ${this.subject})`;
    }
}

function extendProrotype(classToExtend) {
    //Adding new properties to the prototype for the passed class
    classToExtend.prototype.species = 'Human'
    classToExtend.prototype.toSpeciesString = function () {
        return `I am a ${this.species}. ${this.toString()}`;
    }
}

extendProrotype(Person);
let person = new Person("Boko", "chekmedjeta@zlato.bg");
//console.log(person.__proto__);
console.log(person.toSpeciesString());
// I am a Human. Person (name: Boko, email: chekmedjeta@zlato.bg)