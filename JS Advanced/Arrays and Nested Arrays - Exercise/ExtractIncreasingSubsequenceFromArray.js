function solve(inputArr = []) {
    let res = [];
    let cycle = inputArr.forEach((x, i) => {
        if (x >= res[res.length - 1] || res.length < 1) {
            res.push(x);
        }
    });

    return res;
}

solve([1, 3, 8, 4, 10, 12, 3, 2, 24])
solve([20, 3, 2, 15, 6, 1])