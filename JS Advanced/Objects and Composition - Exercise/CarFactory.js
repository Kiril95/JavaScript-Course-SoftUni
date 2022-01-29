function solve(inputObj = {}) {
    let resultObj = {
        model: inputObj.model,
    };

    if (inputObj.power <= 90) {
        resultObj.engine = {
            power: 90,
            volume: 1800
        }
    }
    else if (inputObj.power > 90 && inputObj.power <= 120) {
        resultObj.engine = {
            power: 120,
            volume: 2400
        }
    }
    else if (inputObj.power >= 200) {
        resultObj.engine = {
            power: 200,
            volume: 3500
        }
    }
    resultObj.carriage = {
        type: inputObj.carriage,
        color: inputObj.color
    }

    if (Number(inputObj.wheelsize) % 2 === 0) {
        let roundedDown = inputObj.wheelsize - 1;
        resultObj.wheels = [roundedDown, roundedDown, roundedDown, roundedDown];
    }
    else {
        resultObj.wheels = [inputObj.wheelsize, inputObj.wheelsize, inputObj.wheelsize, inputObj.wheelsize];
    }

    return resultObj;
}

solve({
    model: 'VW Golf II',
    power: 90,
    color: 'blue',
    carriage: 'hatchback',
    wheelsize: 14
})
solve({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
})
