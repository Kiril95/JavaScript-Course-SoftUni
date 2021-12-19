function solve(inputArr = []) {
    let currentNum = 1;
    let resultArr = [];

    for (let operation of inputArr) {
        if (operation === "add") {
            resultArr.push(currentNum);
        }
        else if (operation === "remove") {
            resultArr.pop();
        }
        currentNum++;
    }
    console.log(resultArr.some(x => x) ? resultArr.join("\n") : "Empty");
}

solve(['add', 'add', 'add', 'add'])
solve(['add', 'add', 'remove', 'add', 'add'])