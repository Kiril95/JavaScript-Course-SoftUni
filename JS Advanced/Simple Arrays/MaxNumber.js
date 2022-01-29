function solve(array = []) {
    let resultArr = [];

    for (let i = 0; i <= array.length - 1; i++) {
        let isBigger = true;

        for (let j = i + 1; j <= array.length - 1; j++) {

            if (array[i] <= array[j]) {
                isBigger = false;
                break;
            }
        }
        if (isBigger === true) {
            resultArr.push(Number(array[i]));
        }
    }

    console.log(resultArr.join(" "));
}

solve([1, 4, 3, 2]);
solve([14, 24, 3, 19, 15, 17]);
solve([41, 41, 34, 20]);
solve([27, 19, 42, 2, 13, 45, 48]);