function solve(inputArr = []) {
  
  while (inputArr.length > 1) {
    let condense = [];

    for (let i = 0; i < inputArr.length - 1; i++) {
      condense[i] = inputArr[i] + inputArr[i + 1];
    }

    inputArr = condense;
  }

  console.log(Number(inputArr));
}

solve([2, 10, 3]);
solve([5, 0, 4, 1, 2]);
