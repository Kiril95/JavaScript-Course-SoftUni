function solve(inputArr = []) {
    let result = 'no';

    for (let i = 0; i < inputArr.length; i++) {
        let leftSum = 0;
        let rightSum = 0;

        for (let j = 0; j < i; j++) {
            leftSum += inputArr[j];
        }

        for (let k = inputArr.length - 1; k > i; k--) {
            rightSum += inputArr[k];
        }

        if (leftSum === rightSum) {
            result = i;
            break;
        }
    }
    console.log(result);
}

solve([1, 2, 3, 3])
solve([10, 5, 5, 99, 3, 4, 2, 5, 1, 1, 4])
