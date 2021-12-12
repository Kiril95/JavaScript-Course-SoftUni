function solve(inputArr = []) {
  let initTotalSum = inputArr.reduce((x, y) => x + y);

  for (let i = 0; i < inputArr.length; i++) {
    if (inputArr[i] % 2 === 0) {
      inputArr[i] += i;
      
    } else if (inputArr[i] % 2 !== 0) {
      inputArr[i] -= i;
    }
  }
  let finalTotalSum = inputArr.reduce((x, y) => x + y);

  console.log(inputArr);
  console.log(initTotalSum);
  console.log(finalTotalSum);
}

solve([5, 15, 23, 56, 35]);
solve([-5, 11, 3, 0, 2]);
