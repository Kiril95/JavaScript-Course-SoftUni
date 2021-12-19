function solve(inputArr = []) {
    return inputArr
        .sort((x, y) => x.localeCompare(y))
        .map((x, count) => `${count + 1}.${x}`)
        .join("\n");
}

solve(["John", "Bob", "Christina", "Ema"])