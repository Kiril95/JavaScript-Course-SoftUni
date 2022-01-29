function solve(input = String) {
    let getWords = input.match(/[\w]+/g).join(", ").toUpperCase()
    console.log(getWords);
}

solve('Hi, how are you?')