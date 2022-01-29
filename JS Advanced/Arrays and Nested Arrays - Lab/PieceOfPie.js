function solve(inputArr = [], startStr, endStr) {
    let startIndex = inputArr.indexOf(startStr);
    let endIndex = inputArr.indexOf(endStr);
    let resultArr = inputArr.slice(startIndex, endIndex + 1);

    return resultArr;
}

solve(['Pumpkin Pie', 'Key Lime Pie', 'Cherry Pie', 'Lemon Meringue Pie', 'Sugar Cream Pie'],
    'Key Lime Pie',
    'Lemon Meringue Pie')
