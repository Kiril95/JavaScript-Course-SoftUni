function largestNum(first, second, third) {
    let arr = [first, second, third];
    let sorted = arr.sort((x, y) => y - x);
    console.log(`The largest number is ${sorted[0]}.`);
}

largestNum(5, -3, 16);