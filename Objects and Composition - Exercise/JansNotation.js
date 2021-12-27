function solve(inputArr = []) {
    let numbers = [];

    for (const item of inputArr) {
        if (parseInt(item)) {
            numbers.push(parseInt(item));
        }
        else {
            if (numbers.length < 2) {
                console.log('Error: not enough operands!');
                return;
            }

            let first = numbers.pop();
            let second = numbers.pop();

            if (item == "+") {
                numbers.push(second + first);
            }
            else if (item == "-") {
                numbers.push(second - first);
            }
            else if (item == "*") {
                numbers.push(second * first);
            }
            else if (item == "/") {
                numbers.push(second / first);
            }
        }
    }

    console.log(numbers.length > 1 ? 'Error: too many operands!' : numbers[0]);
}

solve([3, 4, '+'])
solve([5, 3, 4, '*', '-'])
solve([7, 33, 8, '-'])
solve([15, '/'])