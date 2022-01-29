function solution(){
    let str = '';

    return operations = {
        append: function(input){
            str += input;
        },
        removeStart: function(count){
            str = str.slice(count);
        },
        removeEnd: function(count){
            str = str.substring(0, str.length - count);
        },
        print: function(){
            console.log(str);
        },
    };
}

let secondZeroTest = solution();

secondZeroTest.append('123');
secondZeroTest.append('45');
secondZeroTest.removeStart(2);
secondZeroTest.removeEnd(1);
secondZeroTest.print();

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();