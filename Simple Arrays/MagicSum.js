function solve(inputArr, num) {
    for (let i = 0; i < inputArr.length; i++) {
        for (let j = i + 1; j < inputArr.length; j++) {

            if (Number(inputArr[i]) + Number(inputArr[j]) === (num)) {
                console.log(`${inputArr[i]} ${inputArr[j]}`);
            }
        }
    }
}

solve([1, 7, 6, 2, 19, 23], 8);
solve([14, 20, 60, 13, 7, 19, 8], 27);