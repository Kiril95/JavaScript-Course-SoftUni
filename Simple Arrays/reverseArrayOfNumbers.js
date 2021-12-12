function solve(n, inputArr) {
  let arr = inputArr.slice(0, n).reverse();
  let output = arr.join(" ");
  console.log(output);
}

solve(3, [10, 20, 30, 40, 50]);
solve(4, [-1, 20, 99, 5]);
