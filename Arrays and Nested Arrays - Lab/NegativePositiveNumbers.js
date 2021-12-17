function solve(inputArr = []) {
    let resultArr = [];

    for (let i = 0; i < inputArr.length; i++) {
        let num = Number(inputArr[i]);
        if (num < 0) {
            resultArr.unshift(num);
        }
        else {
            resultArr.push(num);
        }
    }
    console.log(resultArr.join("\n"));
}

solve([7, -2, 8, 9])