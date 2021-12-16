function calculate(num, op1, op2, op3, op4, op5) {
    let operations = [op1, op2, op3, op4, op5];
    let parsedNum = Number(num);

    for (let item of operations) {
        switch (item) {
            case "chop": parsedNum /= 2; break;
            case "dice": parsedNum = Math.sqrt(parsedNum); break;
            case "spice": parsedNum++; break;
            case "bake": parsedNum *= 3; break;
            case "fillet": parsedNum = (parsedNum * 0.80).toFixed(2); break;
        }
        console.log(parsedNum);
    }
}

calculate('32', 'chop', 'chop', 'chop', 'chop', 'chop')
calculate('9', 'dice', 'spice', 'chop', 'bake', 'fillet')