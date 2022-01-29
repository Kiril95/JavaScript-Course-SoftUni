function solve(inputArr = []) {
    let res = [];
    let ascend = inputArr.sort((x, y) => x - y);

    while (inputArr.length > 0) {
        res.push(ascend.shift());
        res.push(ascend.pop());
    }

    return res;
}

solve([1, 65, 3, 52, 48, 63, 31, -3, 18, 56])