function solve(numbers) {
    let digits = numbers.toString().split('');
    let sum = digits.map(x => Number(x)).reduce((x, y) => x + y, 0);
    let areSame = digits.every(x => x === digits[0], 0);

    console.log(areSame);
    console.log(sum);
}

solve(2222222)
solve(1234)
