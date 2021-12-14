function towns(inputArray = []) {
    for (let i = 0; i < inputArray.length; i++) {
        let splitted = inputArray[i].split(" | ");
        let data = {
            town: splitted[0],
            latitude: Number(splitted[1]).toFixed(2),
            longitude: Number(splitted[2]).toFixed(2),
        };

        console.log(data);
    }
}

towns(['Sofia | 42.696552 | 23.32601', 'Beijing | 39.913818 | 116.363625'])