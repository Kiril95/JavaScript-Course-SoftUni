function solve(inputArr = [], n) {

    for (let i = 0; i < n; i++) {
        let elem = inputArr.shift();
        inputArr.push(elem);

    }
    console.log(inputArr.join(" "));
}

solve([51, 47, 32, 61, 21], 2);
solve([32, 21, 61, 1], 4);