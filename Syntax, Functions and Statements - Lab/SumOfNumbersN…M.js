function sum(n, m) {
    let sum = 0
    for (let i = Number(n); i <= Number(m); i++) {
        sum += i
    }

    console.log(sum);
}

sum('1', '5')
sum('-8', '20')