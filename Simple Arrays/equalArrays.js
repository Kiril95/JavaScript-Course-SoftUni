function solve(firstArray = [], secondArray = []) {
  let sum = 0;
  let areEquel = true;

  for (let i = 0; i < firstArray.length; i++) {

    firstArray[i] = Number(firstArray[i]);
    secondArray[i] = Number(secondArray[i]);
    sum += firstArray[i];

    if (firstArray[i] != secondArray[i]) {

      console.log(`Arrays are not identical. Found difference at ${i} index`);
      areEquel = false;
      break;
    }
  }

  if (areEquel) {
    console.log(`Arrays are identical. Sum: ${sum}`);
  }
}

solve(["10", "20", "30"], ["10", "20", "30"]);
solve(["1", "2", "3", "4", "5"], ["1", "2", "4", "4", "5"]);
