class Stringer {
    constructor(string, length) {
        this.innerString = string;
        this.innerLength = Number(length);
    }

    increase(num) {
        this.innerLength += num;
    }
    decrease(num) {
        if (this.innerLength - num < 0) {
            this.innerLength = 0;
        } else {
            this.innerLength -= num;
        }
    }
    toString() {
        if (this.innerLength === 0) {
            return '...';
        }
        if (this.innerString.length > this.innerLength) {
            return `${this.innerString.substring(0, this.innerLength)}...`
        }

        return this.innerString
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test
