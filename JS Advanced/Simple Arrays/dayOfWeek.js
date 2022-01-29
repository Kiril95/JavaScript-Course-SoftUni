function solve(number) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  if (number < 1 || number > days.length) {
    console.log("Invalid day!");
  } else {
    console.log(days[number - 1]);
  }
}
solve(3);
solve(6);
