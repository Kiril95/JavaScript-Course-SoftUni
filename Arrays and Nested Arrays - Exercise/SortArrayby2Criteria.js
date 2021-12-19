function solve(inputArr = []) {
    let sorted = inputArr.sort((x, y) => {
        const length = x.length - y.length;
        const alphabetical = x.localeCompare(y);

        return length || alphabetical;
    });

    console.log(sorted.join('\n'));
}

solve(['alpha', 'beta', 'gamma'])
solve(['test', 'Deny', 'omen', 'Default'])