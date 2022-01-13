function solution(...args) {
    let typeCounter = {};
    for (const arg of args) {
        if (!typeCounter[typeof arg]) {
            typeCounter[typeof arg] = 1;
        } else {
            typeCounter[typeof arg]++;
        }

        console.log(`${typeof arg}: ${arg}`);
    }
    let descending = Object.entries(typeCounter).sort((x, y) => y[1] - x[1]);

    for (const [key, value] of descending) {
        console.log(`${key} = ${value}`);
    }
}

solution('cat', 3.333, 9.999, { name: 'bob' }, function () { console.log('Hello world!'); })