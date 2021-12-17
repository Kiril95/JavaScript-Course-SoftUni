function solve(inputArr = []) {
    let result = inputArr.sort((a, b) => a - b).slice(0, 2);
    console.log(result.join(" "));
}

solve([30, 15, 50, 5])