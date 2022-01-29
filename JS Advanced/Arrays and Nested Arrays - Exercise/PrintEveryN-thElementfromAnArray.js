function solve(inputArr = [], step) {
    let resultArr = [];
    for (i = 0; i < inputArr.length; i += step) {
        resultArr.push(inputArr[i]);
    }

    return resultArr;
}

solve(['5', '20', '31', '4', '20'], 2)
solve(['dsa', 'asd', 'test', 'tset'], 2)