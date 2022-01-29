function solve(inputArr = []) {
    let first = Number(inputArr[0]);
    let second = Number(inputArr.pop());
    console.log(first + second);
}

solve(['20', '30', '40'])