function solve(array1, array2) {
  let filteredArray = array1.filter((x) => array2.includes(x));

  console.log(filteredArray.join("\n"));
}

solve(["Hey", "hello", 2, 4, "Peter", "e"], ["Petar", 10, "hey", 4, "hello", "2"]);
