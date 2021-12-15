function aggregate(inputArr = []) {
    let sum = inputArr.reduce((x, y) => x + y, 0);
    let joined = inputArr.join("");
    let inverse = inputArr.reduce((x, y) => x + 1 / y, 0)

    console.log(sum);
    console.log(inverse);
    console.log(joined);
}

aggregate([1, 2, 3]);
aggregate([2, 4, 8, 16]);