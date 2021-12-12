function solve(inputArr = []) {
    let bestSequence = [];

    for (let i = 0; i < inputArr.length; i++) {
        let element = inputArr[i];
        let currentSequence = [element];

        for (let j = i + 1; j < inputArr.length; j++) {
            let nextElement = inputArr[j];

            if (element === nextElement) {
                currentSequence.push(nextElement);
            } else {
                break;
            }
        }
        if (currentSequence.length > bestSequence.length) {
            bestSequence = currentSequence;
        }
    }
    console.log(bestSequence.join(' '));
}

solve([2, 1, 1, 2, 3, 3, 2, 2, 2, 1]);
solve([1, 1, 1, 2, 3, 1, 3, 3]);