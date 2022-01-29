function solve(inputArr = []) {
    let ascending = inputArr.sort((a, b) => a - b);
    let biggerHalf = ascending.slice(ascending.length / 2);

    return biggerHalf;
}

solve([4, 7, 2, 5])
solve([3, 19, 14, 7, 2, 19, 6])