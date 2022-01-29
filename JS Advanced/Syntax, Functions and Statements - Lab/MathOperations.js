function calculator(x, y, sign) {
    let result;
    switch (sign) {
        case "+": result = x + y; break;
        case "-": result = x - y; break;
        case "*": result = x * y; break;
        case "/": result = x / y; break;
        case "%": result = x % y; break;
        case "**": result = x ** y; break;
    }

    console.log(result);
}

calculator(5, 6, '+');
calculator(3, 5.5, '*');