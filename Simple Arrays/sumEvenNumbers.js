function solve(inputArr) {
  let sum = 0;

  for (let i = 0; i < inputArr.length; i++) {
    inputArr[i] = Number(inputArr[i]);

    if (inputArr[i] % 2 === 0) {
      sum += inputArr[i];
    }
  }
  console.log(sum);
}

solve(["2", "4", "6", "8", "10"]);
solve([1, 2, 3, 4, 5, 6]);
