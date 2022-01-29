function solve(firstArr = [], secondArr = []) {
  let finalArr = [];

  for (let i = 0; i <= firstArr.length - 1; i++) {
    if (i % 2 === 0) {
      let newElement = Number(firstArr[i]) + Number(secondArr[i]);
      finalArr.push(newElement);
      
    } else if (i % 2 === 1) {
      let concatElements = firstArr[i] + secondArr[i];
      finalArr.push(concatElements);
    }
  }
  console.log(finalArr.join(" - "));
}

solve(["5", "15", "23", "56", "35"], ["17", "22", "87", "36", "11"]);
solve(["13", "12312", "5", "77", "4"], ["22", "333", "5", "122", "44"]);
