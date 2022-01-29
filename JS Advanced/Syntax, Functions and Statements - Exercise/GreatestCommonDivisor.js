function GCD(first, second) {
    let result = first % second;
    while (result != 0) {
        first = second;
        second = result;
        result = first % second;
    }
    console.log(second);
}

GCD(15, 5)
GCD(2154, 458)