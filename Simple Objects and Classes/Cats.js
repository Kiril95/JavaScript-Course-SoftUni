function kittens(inputArr) {

    class Cat {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        meow = () => console.log(`${this.name}, age ${this.age} says Meow`);
    }

    for (let i = 0; i < inputArr.length; i++) {
        let currentCat = inputArr[i].split(' ');
        let catName = currentCat[0];
        let catAge = currentCat[1];
        let cat = new Cat(catName, catAge);

        cat.meow();
    }
}

kittens(['Mellow 2', 'Tom 5'])