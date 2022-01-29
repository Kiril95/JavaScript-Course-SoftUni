function solution(num) {
    let sum = 0;
    return function (num2){
        return sum = num + num2;
    }
}

let add5 = solution(5);
console.log(add5);
console.log(add5(2));
console.log(add5(3));