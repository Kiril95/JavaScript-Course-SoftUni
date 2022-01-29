function solve(n, k) {
    let result = [1, 1];

    for (let i = 2; i < n; i++) {
        let tempSum = 0;
        let reversed = JSON.parse(JSON.stringify(result)).reverse();

        for (let j = 0; j < reversed.length; j++) {
            let current = Number(reversed[j]);
            if (k === j) {
                break;
            }

            tempSum += current;
        }
        result.push(tempSum);
    }
    return result;
}

solve(6, 3)