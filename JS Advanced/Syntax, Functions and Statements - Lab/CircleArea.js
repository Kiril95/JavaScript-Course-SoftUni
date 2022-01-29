function circleArea(input) {
    if (typeof input === "number") {
        let calc = Math.PI * input * input;
        console.log(calc.toFixed(2));
    }
    else {
        console.log(`We can not calculate the circle area, because we receive a ${typeof input}.`);
    }
}

circleArea(5)
circleArea("nope")