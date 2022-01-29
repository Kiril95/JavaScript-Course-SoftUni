function solve(inputArr) {
    let result = [];
    for (let i = 0; i < inputArr.length; i++) {

        if (i % 2 === 0) {
            result.push(inputArr[i]);
        }
    }
    console.log(result.join(" "));
}

solve(['20', '30', '40', '50', '60'])