class Hex {
    constructor(number) {
        this.number = number;
    }
    valueOf(){
        return this.number;
    }
    plus(value){
        let newVal = this.number + value;
        return new Hex(newVal);
    }
    minus(value){
        let newVal = this.number - value;
        return new Hex(newVal);
    }
    parse(str){
        return parseInt(typeof str === 'string' ? str : {str}, 16);
    }
    toString(){
        return `0x${this.number.toString(16).toUpperCase()}`;
    }
}

let FF = new Hex(255);
console.log(FF.toString());
FF.valueOf() + 1 == 256;
let a = new Hex(10);
let b = new Hex(5);
console.log(a.plus(b).toString());
console.log(a.plus(b).toString()==='0xF');
console.log(FF.parse('AAA'));