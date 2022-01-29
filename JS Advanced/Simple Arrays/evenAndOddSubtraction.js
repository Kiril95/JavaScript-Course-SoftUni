function solve(inputArr = []) {
  let sumEven = 0;
  let sumOdd = 0;

  for (let i = 0; i < inputArr.length; i++) {
    let element = inputArr[i];

    if (element % 2 === 0) {
      sumEven += element;
      
    } else if (element % 2 !== 0) {
      sumOdd += element;
    }
  }
  console.log(sumEven - sumOdd);
}

solve([1, 2, 3, 4, 5, 6]);
solve([3, 5, 7, 9]);
